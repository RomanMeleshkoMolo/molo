/**
 * © [2025] Molo. All rights reserved.
 * Molo is a private development, and all rights are owned by the app's owner.
 */

import React from 'react';
import { View, Text, ScrollView, Linking} from 'react-native';

// Connect components
import GoBackButton from "../../Components/Bottons/GoBackButton";

import style from "./styles/UserConditionInfo.scss";

const UserConditionInfo = ({ navigation }) => {
  return (
     <View style={[style.container]}>

        <View style={style.header}>
            <GoBackButton
               navigation={navigation}
            ></GoBackButton>
        </View>

        <ScrollView style={style.containerInfo}>
           <Text style={style.header}>Условия пользования Molo</Text>
           <Text style={style.paragraph}>
              Пользуясь этим приложением, вы принимаете Условия пользования Molo и подтверждаете, что вам 18 или более лет.
              {/*<Text style={styles.link} onPress={() => Linking.openURL('http://eu1.badoo.com/terms/')}>*/}
              {/*  ссылке*/}
              {/*</Text>.*/}
           </Text>
           <Text style={style.paragraph}>
               <Text style={style.paragraphNumber}>Основные положения:</Text>
           </Text>
           <Text style={style.paragraph}>
              <Text style={style.paragraphNumber}>1. </Text>
               Вам должно быть не менее 18 лет.
           </Text>
           <Text style={style.paragraph}>
               <Text style={style.paragraphNumber}>2. </Text>
               Данные вашего профиля будут доступны другим пользователям Molo.
           </Text>
           <Text style={style.paragraph}>
               <Text style={style.paragraphNumber}>3. </Text>
               В приложении Molo ЗАПРЕЩАЕТЬСЯ  ниже изложенное:
           </Text>
           <Text style={style.bullet}>
               • обманывать других пользователей в угоду собственной выгоды
           </Text>
           <Text style={style.bullet}>
               • не используйте Molo для продвижения товаров и услуг
           </Text>
           <Text style={style.bullet}>
               • публиковать оскорбительные, противозаконные, непристойные или порнографические материалы любого содержания
           </Text>
           <Text style={style.bullet}>
               • публиковать чужие материалы без разрешения их правообладателей
           </Text>
           <Text style={style.paragraph}>
               <Text style={style.paragraphNumber}>4. </Text>
               В случае противозаконных действий Molo известит правоохранительные органы о нарушении.
           </Text>
           <Text style={style.paragraph}>
               <Text style={style.paragraphNumber}>5. </Text>
               Molo не разглашает ваш номер телефона и email, а также не продает ваши персональные данные третьим лицам.
           </Text>

            <Text style={style.header}>Подписка и оплата</Text>
            <Text style={style.paragraph}>
               Приложение Molo предлагает платную премиум-подписку, которая предоставляет доступ к эксклюзивным функциям, включая премиум аккаунт который предоставляет расширенные возможности.
            </Text>
            <Text style={style.paragraph}>
               Информация о платных функциях:
            </Text>
            <Text style={style.paragraph}>
               <Text style={style.paragraphNumber}>6. </Text>
               Подписка может быть оформлена через приложение, следуя инструкциям на экране. Оплата будет списываться автоматически на регулярной основе, в зависимости от выбранного плана (ежемесячно, ежегодно и т.д.).
            </Text>
            <Text style={style.paragraph}>
               <Text style={style.paragraphNumber}>7. </Text>
               Пользователи могут управлять своей подпиской, включая изменения плана или обновление платежной информации, через раздел «Настройки» в приложении, выбрав опцию «Управление Подписками».
            </Text>
            <Text style={style.paragraph}>
               <Text style={style.paragraphNumber}>8. </Text>
               Вы можете отменить подписку в любое время через тот же раздел «Управление Подписками». Подписка останется активной до конца оплаченного периода, после чего доступ к премиум-функциям будет прекращен.
            </Text>

        </ScrollView>
     </View>
  );
};

export default UserConditionInfo;
