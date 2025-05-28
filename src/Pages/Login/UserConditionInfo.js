import React from 'react';
import {StyleSheet, View, Text, ScrollView, Linking} from 'react-native';

// Connect components
import GoBackButton from "../../Components/Bottons/GoBackButton";

// Connect Global Styles
import { globalStyles } from "../../Styles/globalStyles";

const UserConditionInfo = ({ navigation }) => {
  return (
     <View style={[styles.container, globalStyles.globalBackground]}>

        <View style={styles.header}>
            <GoBackButton
               navigation={navigation}
            ></GoBackButton>
        </View>

        <ScrollView style={styles.containerInfo}>
           <Text style={styles.header}>Условия пользования Molo</Text>
           <Text style={styles.paragraph}>
              Пользуясь этим приложением, вы принимаете Условия пользования Molo и подтверждаете, что вам 18 или более лет.
              {/*<Text style={styles.link} onPress={() => Linking.openURL('http://eu1.badoo.com/terms/')}>*/}
              {/*  ссылке*/}
              {/*</Text>.*/}
           </Text>
           <Text style={styles.paragraph}>
               <Text style={styles.paragraphNumber}>Основные положения:</Text>
           </Text>
           <Text style={styles.paragraph}>
              <Text style={styles.paragraphNumber}>1. </Text>
               Вам должно быть не менее 18 лет.
           </Text>
           <Text style={styles.paragraph}>
               <Text style={styles.paragraphNumber}>2. </Text>
               Данные вашего профиля будут доступны другим пользователям Molo.
           </Text>
           <Text style={styles.paragraph}>
               <Text style={styles.paragraphNumber}>3. </Text>
               В приложении Molo ЗАПРЕЩАЕТЬСЯ  ниже изложенное:
           </Text>
           <Text style={styles.bullet}>
               • обманывать других пользователей в угоду собственной выгоды
           </Text>
           <Text style={styles.bullet}>
               • не используйте Molo для продвижения товаров и услуг
           </Text>
           <Text style={styles.bullet}>
               • публиковать оскорбительные, противозаконные, непристойные или порнографические материалы любого содержания
           </Text>
           <Text style={styles.bullet}>
               • публиковать чужие материалы без разрешения их правообладателей
           </Text>
           <Text style={styles.paragraph}>
               <Text style={styles.paragraphNumber}>4. </Text>
               В случае противозаконных действий Molo известит правоохранительные органы о нарушении.
           </Text>
           <Text style={styles.paragraph}>
               <Text style={styles.paragraphNumber}>5. </Text>
               Molo не разглашает ваш номер телефона и email, а также не продает ваши персональные данные третьим лицам.
           </Text>

            <Text style={styles.header}>Подписка и оплата</Text>
            <Text style={styles.paragraph}>
               Приложение Molo предлагает платную премиум-подписку, которая предоставляет доступ к эксклюзивным функциям, включая премиум аккаунт который предоставляет расширенные возможности.
            </Text>
            <Text style={styles.paragraph}>
               Информация о платных функциях:
            </Text>
            <Text style={styles.paragraph}>
               <Text style={styles.paragraphNumber}>6. </Text>
               Подписка может быть оформлена через приложение, следуя инструкциям на экране. Оплата будет списываться автоматически на регулярной основе, в зависимости от выбранного плана (ежемесячно, ежегодно и т.д.).
            </Text>
            <Text style={styles.paragraph}>
               <Text style={styles.paragraphNumber}>7. </Text>
               Пользователи могут управлять своей подпиской, включая изменения плана или обновление платежной информации, через раздел «Настройки» в приложении, выбрав опцию «Управление Подписками».
            </Text>
            <Text style={styles.paragraph}>
               <Text style={styles.paragraphNumber}>8. </Text>
               Вы можете отменить подписку в любое время через тот же раздел «Управление Подписками». Подписка останется активной до конца оплаченного периода, после чего доступ к премиум-функциям будет прекращен.
            </Text>

        </ScrollView>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  containerInfo: {
    padding: 10
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center"
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Montserrat-Medium',
  },
  paragraphNumber: {
    fontFamily: 'Montserrat-Bold',
  },
  bullet: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

});

export default UserConditionInfo;
