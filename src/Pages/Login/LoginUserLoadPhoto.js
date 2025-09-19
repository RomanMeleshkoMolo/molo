import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  PermissionsAndroid,
  FlatList
} from 'react-native';

// Connect AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// Connect Redux
import { useDispatch } from 'react-redux';
import { setRegTokenAction, setUserAction } from "redux/actions";

// Connect UI Components
import ButtonNameIcon from "Components/Buttons/ButtonNameIcon";
import ModalInfo from "Components/Modals/ModalInfo";
import Title from "Components/Titles/Title";
import SubTitle from "Components/Titles/SubTitle";
import TitleWithIcon from "Components/Titles/TitleWithIcon";

// Connect styles
import styles from "LoginStyles/LoginUserLoadPhoto.scss";

import { useNavigation } from "@react-navigation/native";

// Keys of state of this Component
const LAST_ROUTE_KEY = '@authFlow:lastRoute';
const PHOTOS_UPLOADED_KEY = 'photosUploaded';

// End-point
const uploadPath = '/onboarding/photos';

// Size of load Photo
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 МБ
const MAX_PHOTOS = 30;

async function requestCameraPermission() {
  if (Platform.OS !== 'android') return true;

  try {
    const camGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    return camGranted === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
}

const LoginUserLoadPhoto = ({ navigation }) => {
  const dispatch = useDispatch();

  const [token, setToken] = useState(null);
  const [picking, setPicking] = useState(false);

  const [errorUserCode, setErrorUserCode] = useState(false);
  const [info, setInfo] = useState('');
  const [colorModal, setColorModal] = useState('#ffcc00');

  const [photos, setPhotos] = useState([]);

  // upload state
  const [isUploading, setIsUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0); // 0..1
  const xhrRef = useRef(null);

  const autoUploadTimerRef = useRef(null);

  const isUploadingRef = useRef(false);
  const settledRef = useRef(false);


  const baseURL = useMemo(() => {
    if (Platform.OS === 'ios') return 'http://localhost:3000';
    return 'http://192.168.0.107:3000';
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('registrationUserLoadPhoto', 'true').catch(() => {});
  }, []);


  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await AsyncStorage.setItem(LAST_ROUTE_KEY, 'LoginUserLoadPhoto');

        const flag = await AsyncStorage.getItem(PHOTOS_UPLOADED_KEY);
        if (mounted && flag === 'true') {
          // Фото уже были загружены ранее — перенаправляем
          navigation.replace('LoginUserLocation'); // замените на ваш реальный экран

          // Alert.alert("Go to next Page");

          // return;
        }
      } catch {
          // игнорируем
      }
    })();

    return () => { mounted = false; };
  }, [navigation]);


  const markPhotosUploaded = () =>
  AsyncStorage.setItem(PHOTOS_UPLOADED_KEY, 'true');


  const clearPhotosUploaded = () =>
  AsyncStorage.setItem(PHOTOS_UPLOADED_KEY, 'false');


  useEffect(() => {
    const hydrate = async () => {
      const t = await AsyncStorage.getItem('regToken');
      setToken(t);
      if (t) dispatch(setRegTokenAction(t));
    };
    hydrate();
  }, [dispatch]);


  useEffect(() => {
    // запускаем автозагрузку, если:
    // - есть queued фото
    // - сейчас не идет загрузка
    // - есть токен (если сервер требует авторизацию)
    const hasQueued = photos.some(p => p.status === 'queued');

    if (!isUploading && hasQueued && token) {
      // Небольшой debounce на случай, если photos меняется несколько раз подряд
      if (autoUploadTimerRef.current) clearTimeout(autoUploadTimerRef.current);
      autoUploadTimerRef.current = setTimeout(() => {
        handlerUploadPhone().catch(() => {});
      }, 200);
    }

    return () => {
      if (autoUploadTimerRef.current) clearTimeout(autoUploadTimerRef.current);
    };
  }, [photos, isUploading, token]);


  const remainingSlots = Math.max(0, MAX_PHOTOS - photos.length);


  const showError = (message, color = '#ffcc00') => {
    setColorModal(color);
    setInfo(message);
    setErrorUserCode(true);
  };


  const openSourcePicker = () => {
    if (isUploading) return;
    if (remainingSlots <= 0) {
      showError(`Можно загрузить не более ${MAX_PHOTOS} фотографий`);
      return;
    }

    Alert.alert(
      'Добавить фото',
      `Выберите источник (доступно слотов: ${remainingSlots})`,
      [
        { text: 'Камера', onPress: handleOpenCamera },
        { text: 'Галерея', onPress: handleOpenLibrary },
        { text: 'Отмена', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };


  const handleOpenCamera = async () => {
    if (isUploading) return;

    const ok = await requestCameraPermission();
    if (!ok) {
      showError('Разрешения на камеру должны быть предоставлены.');
      return;
    }

    if (remainingSlots <= 0) {
      showError(`Лимит ${MAX_PHOTOS} фото достигнут`);
      return;
    }

    setPicking(true);
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: false,
        quality: 0.9,
        cameraType: 'back',
      });
      processPickerResult(result);
    } finally {
      setPicking(false);
    }
  };


  const handleOpenLibrary = async () => {
    if (isUploading) return;

    if (remainingSlots <= 0) {
      showError(`Лимит ${MAX_PHOTOS} фото достигнут`);
      return;
    }

    setPicking(true);
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: remainingSlots,
        includeBase64: false,
        quality: 0.9,
      });
      processPickerResult(result);
    } finally {
      setPicking(false);
    }
  };


  const processPickerResult = async (result) => {

    if (result?.didCancel) return;

    if (result?.errorCode) {
      showError(result.errorMessage || 'Не удалось выбрать фото');
      return;
    }

    const assets = result?.assets || [];
    const valid = [];
    const rejectedBySize = [];

    assets.forEach(a => {
      const size = a.fileSize || 0;
      if (size > MAX_FILE_SIZE) {
        rejectedBySize.push(a.fileName || a.uri);
      } else {
        valid.push({
          uri: a.uri,
          fileName: a.fileName || `photo_${Date.now()}.jpg`,
          type: a.type || 'image/jpeg',
          fileSize: size,
          width: a.width,
          height: a.height,
          status: 'queued',
          progress: 0,
        });
      }
    });

    if (rejectedBySize.length) {
      showError(`Некоторые файлы превышают 5 МБ: ${rejectedBySize.join(', ')}`);
    }

    const slots = Math.max(0, MAX_PHOTOS - photos.length);
    const toAdd = valid.slice(0, slots);


    if (valid.length > slots) {
      showError(`Можно добавить ещё только ${slots} фото`);
    }

    if (toAdd.length) {
      setPhotos(prev => [...prev, ...toAdd]);
    }
  };


  const removePhoto = (idx) => {
    if (isUploading) return;
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  // Создает FormData сразу для всех фото
  const buildFormData = () => {
    const form = new FormData();
    photos.forEach((p, idx) => {
      form.append('photos', {
        uri: p.uri,
        name: p.fileName || `photo_${idx}.jpg`,
        type: p.type || 'image/jpeg',
      });
    });
    return form;
  };


  const markAllQueuedOrUploadingAsError = (message) => {
    setPhotos(prev => prev.map(p =>
      (p.status === 'queued' || p.status === 'uploading')
        ? { ...p, status: 'error', errorText: message, progress: 0 }
        : p
    ));
  };


  // New uploadPhotos
  const uploadPhotos = () => {

    if (!photos.length) {
      return Promise.reject(new Error('Нет фото для загрузки'));
    }

    if (isUploadingRef.current) {
      return Promise.reject(new Error('Загрузка уже выполняется'));
    }

    isUploadingRef.current = true;
    settledRef.current = false;

    const finish = (cb) => {

      if (settledRef.current) return;
        settledRef.current = true;
        isUploadingRef.current = false;
        xhrRef.current = null;
        cb && cb();
    };

  // Новый подход:
  // 1) для каждого файла получить presigned URL
  // 2) загрузить файл напрямую в S3 через PUT
  // 3) отправить метаданные в бэкенд
  // Прогресс: общий прогресс по количеству файлов + прогресс внутри загрузки файла (минимальная версия)

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const total = photos.length;
        let completed = 0;

        // Список метаданных для бэкенда
        const uploadedMeta = [];

        for (let i = 0; i < photos.length; i++) {
          const p = photos[i];
          // 1) получить presigned URL
          const presignedRes = await fetch(
            `${baseURL}/storage/presigned-upload?filename=${encodeURIComponent(p.name)}&contentType=${encodeURIComponent(p.type)}`,
            {
              headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
            }
          );
          if (!presignedRes.ok) {
            throw new Error('Не удалось получить presigned URL');
          }
          const presigned = await presignedRes.json(); // { url, key }

          // Опционально: показать прогресс получения presigned URL
          // можно обновлять общий прогресс, но это не сильно влияет.

          // 2) загрузка на S3 напрямую
          const fileBlob = await fetch(p.uri).then(r => r.blob());

          // Используем PUT для прямой загрузки в S3
          const uploadRes = await fetch(presigned.url, {
            method: 'PUT',
            headers: {
              'Content-Type': p.type,
            },
            body: fileBlob,
          });

          if (!uploadRes.ok) {
            // throw new Error('Не удалось загрузить фото в S3');

             const text = await uploadRes.text().catch(() => '');
              console.error('S3 upload failed', {
                status: uploadRes.status,
                statusText: uploadRes.statusText,
                body: text
              });
              throw new Error(`Не удалось загрузить фото в S3 (status ${uploadRes.status})`);
          }

          // 3) готовим метаданные для бэкенда
          uploadedMeta.push({
            key: presigned.key,
            filename: p.name,
            mimeType: p.type,
            size: p.size,
          });

          // Обновляем прогресс по файлу
          completed += 1;
          const frac = total > 0 ? completed / total : 0;
          setOverallProgress(frac);
          // Можно дополнительно пометить загрузку текущего файла как "done"
          setPhotos(prev => prev.map((pp, idx) => idx === i ? { ...pp, status: 'done', progress: 1 } : pp));
        }

        // 4) отправка метаданных на бекенд
        const res = await fetch(`${baseURL}/onboarding/photos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ photos: uploadedMeta }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Failed to save photo metadata');

        // Успешно: обновляем состояние
        setPhotos(prev => prev.map(p => ({ ...p, status: 'done', progress: 1 })));

        // Флаг УСПЕШНОЙ загрузки
        await markPhotosUploaded();

        if (data?.user) {
          dispatch(setUserAction(data.user));
        }

        resolve(data);
      } catch (err) {
        // Ошибка: пометим как error и дернем обработку
        setPhotos(prev => prev.map((p) => ({ ...p, status: 'error' })));
        await clearPhotosUploaded();
        const message = err?.message || 'Не удалось загрузить фото';
        reject(new Error(message));
      } finally {
        finish();
      }
    })();
  });
};


  const cancelUpload = () => {
    if (xhrRef.current) {
      try {
        xhrRef.current.abort();
      } catch {}
      xhrRef.current = null;
      setIsUploading(false);
      setOverallProgress(0);
      // Отметим все как error/прервано
      setPhotos(prev => prev.map(p => p.status === 'uploading' ? { ...p, status: 'error', errorText: 'Загрузка отменена' } : p));
      showError('Загрузка отменена', '#ffcdd2');
    }
  };

  const handlerUploadPhone = async () => {
    try {
      setIsUploading(true);
      setOverallProgress(0);
      // пометим queued -> uploading перед стартом (визуально, если не будет onprogress сразу)
      // setPhotos(prev => prev.map(p => ({ ...p, status: 'uploading', progress: 0 })));

      const data = await uploadPhotos();

      // В случае успеха
      // navigation.replace('LoginUserWish');
      showError('Фотографии успешно загружены!', '#c8f7c5');
    } catch (error) {
      showError(error.message || 'Ошибка при загрузке фото', '#ffcdd2');
    } finally {
      setIsUploading(false);
    }
  }

  const goToNextPage = async () => {

    if (isUploading) return;

    // В случае успеха
    navigation.replace('LoginUserLocation');

  };

  // Мелкая утилита рендера прогресс-бара
  const ProgressBar = ({ progress }) => {
    const pct = Math.max(0, Math.min(1, progress || 0));
    return (
      <View style={{ height: 6, backgroundColor: '#eee', borderRadius: 3, overflow: 'hidden' }}>
        <View style={{ width: `${pct * 100}%`, height: '100%', backgroundColor: '#4caf50' }} />
      </View>
    );
  };

  const renderPhotoStatus = (p) => {
    if (p.status === 'uploading') {
      return (
        <View style={{ position: 'absolute', left: 6, right: 6, bottom: 6 }}>
          <ProgressBar progress={p.progress ?? 0} />
          <Text style={{ color: '#fff', fontSize: 12, marginTop: 4 }}>
            Загрузка... {Math.round((p.progress ?? 0) * 100)}%
          </Text>
        </View>
      );
    }
    if (p.status === 'done') {
      return (
        <View style={{ position: 'absolute', left: 6, right: 6, bottom: 6 }}>
          <Text style={{ color: '#c8f7c5', fontWeight: '600' }}>Готово</Text>
        </View>
      );
    }
    if (p.status === 'error') {
      return (
        <View style={{ position: 'absolute', left: 6, right: 6, bottom: 6 }}>
          <Text style={{ color: '#ffdddd' }}>Ошибка: {p.errorText || ''}</Text>
        </View>
      );
    }
    return null;
  };

  const dataWithAdd = [...photos, { id: 'ADD' }];

  const renderPhotoItem = ({ item, index }) => (
     <View style={styles.photoItem}>
       <Image source={{ uri: item.uri }} style={styles.photo} resizeMode="cover" />
        {!isUploading && (
           <TouchableOpacity style={styles.removeBtn} onPress={() => removePhoto(index)}>
              <Text style={styles.removeText}>Удалить</Text>
           </TouchableOpacity>
        )}
        {renderPhotoStatus(item)}
     </View>
  );


  return (
     <View style={styles.container}>
        <Title>Загрузите свои фотографии</Title>

        <SubTitle>Выбери минимум 1 свое фото, для успешной регистрации</SubTitle>


        {/* Общий прогресс (показываем при загрузке) isUploading */}
        {isUploading && (
           <View style={styles.progressBar}>
              <ProgressBar progress={overallProgress} />
              <TouchableOpacity
                 onPress={cancelUpload}
                 style={styles.cancelBtn}
              >
              <Text>Отменить загрузку</Text>
              </TouchableOpacity>
           </View>
        )}

        <View style={styles.content}>
           <View style={styles.counterRow}>
              <Text style={styles.counterText}>
                Фото: {photos.length}/{MAX_PHOTOS}
              </Text>
           </View>

        </View>

        <ScrollView style={styles.gridScroll}>
           <FlatList
              data={photos}
              renderItem={renderPhotoItem}
              keyExtractor={(item, i) => `${item.uri}_${i}`}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              scrollEnabled={false} // чтобы ScrollView сам отвечал за прокрутку, если нужно
           />
           {photos.length < MAX_PHOTOS && !isUploading && (
             // Карточка добавления за пределами FlatList, чтобы она тоже попадала в сетку
              <TouchableOpacity style={styles.addCard} onPress={openSourcePicker} disabled={picking}>
                 <Text style={styles.addPlus}>＋</Text>
                 <Text style={styles.addText}>{picking ? 'Открываем...' : 'Добавить фото'}</Text>
              </TouchableOpacity>
           )}
        </ScrollView>


        <View style={styles.footer}>
           <TitleWithIcon
              nameIcon="information-circle-outline"
           >
           Если захочешь, ты сможешь добавить ещё фотографии из своего профиля
           </TitleWithIcon>

           <ButtonNameIcon
              buttonText={
                 isUploading
                   ? `Загружаем... ${Math.round(overallProgress * 100)}%`
                   : 'Дальше'
              }
              handle={!isUploading ? goToNextPage : undefined}
              disable={isUploading || photos.length === 0}
           />
        </View>

        {errorUserCode && (
           <ModalInfo
              message={info}
              backgroundColor={colorModal}
              textColor="#000"
              onHide={() => setErrorUserCode(false)}
           />
        )}
     </View>

  );
};

export default LoginUserLoadPhoto;
