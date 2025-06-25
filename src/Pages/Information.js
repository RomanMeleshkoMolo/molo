import React from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';

// Components for page
import GoBackButton from "Components/Buttons/GoBackButton";

const Information = () => {

   return (
   <View style={styles.container}>

      <GoBackButton></GoBackButton>

     <ScrollView style={styles.container}>
      <Text style={styles.header}>О приложении PhoneSip</Text>

      <Text style={styles.paragraph}>
        Добро пожаловать в PhoneSip — ваше надежное решение для корпоративной телефонии. Это приложение разработано для упрощения и оптимизации коммуникаций внутри вашей компании.
      </Text>

      <Text style={styles.subheader}>Основные возможности:</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Простые и удобные звонки:</Text> Осуществляйте звонки внутри компании быстро и легко, без лишних настроек.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Высокое качество связи:</Text> Наслаждайтесь стабильной и четкой связью благодаря передовым технологиям передачи данных.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Интеграция с контактами:</Text> Легкий доступ к корпоративным контактам для быстрой связи с коллегами.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>История звонков:</Text> Просматривайте историю звонков для удобства отслеживания общения.
      </Text>

      <Text style={styles.subheader}>Правила пользования:</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Конфиденциальность:</Text> Все звонки защищены и не подлежат разглашению. Убедитесь, что вы используете приложение в соответствии с политиками безопасности вашей компании.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Использование:</Text> Приложение предназначено исключительно для корпоративного общения. Личная или несанкционированная деятельность строго запрещена.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Поддержка:</Text> В случае возникновения проблем, пожалуйста, обратитесь в техническую поддержку вашей компании. Мы всегда готовы помочь вам.
      </Text>

      <Text style={styles.subheader}>Авторские права:</Text>

      <Text style={styles.paragraph}>
        Это приложение является интеллектуальной собственностью [Ваше Имя или Название Компании]. Все права защищены. Любое несанкционированное использование, копирование или распространение приложения строго запрещено.
      </Text>

      <Text style={styles.paragraph}>
        Мы надеемся, что PhoneSip станет для вас незаменимым инструментом в повседневной работе, повышая вашу продуктивность и улучшая коммуникацию.
      </Text>
    </ScrollView>
   </View>
 );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    backgroundColor: "#e5e5e5"
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Information;
