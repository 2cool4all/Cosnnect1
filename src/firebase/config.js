import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyCWjMUOl7QUVW7ds2kkd74zbHBeISQKcNU',
    databaseUrl: 'https://mychat-a100c-default-rtdb.firebaseio.com/',
    projectId: 'mychat-a100c',
    appId: '1:216403130676:android:0b8d62635cae2a34b2cd61',
};


export default Firebase.initializeApp(firebaseConfig);