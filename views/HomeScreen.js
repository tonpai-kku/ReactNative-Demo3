import React, {
    useState,
    useEffect,
} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Alert,
} from 'react-native';

import axios from 'axios';


export default function HomeScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [news, setNews] = useState([]);

    function loadData(){
        setLoading(true);
        axios.get('http://192.168.1.43:3000/news')
        .then(res => {
            const mappedData = res.data.map((item, idx) => ({id: idx, ...item}));
            console.log(mappedData);
            setNews(mappedData);
            setLoading(false);
            // console.log(res.data);
            return res;
        })
        .catch(err => {
            console.log(err);
            Alert.alert(`เกิดข้อผิดพลาดขึ้น`, `ไม่สามารถเชื่อมต่อ Server ได้ (รายละเอียด: ${err})`);
            return err;
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => loadData());
        return unsubscribe;
    }, [navigation]);

    if(isLoading) {
        return (
            <View style={{ flex: 1, padding: 24 }}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
      <View style={styles.container}>
        {/* <Text>Open up App.js to start working on your app!2</Text>
        <Button title="route" onPress={() => navigation.navigate('News') }/> */}
        <FlatList
            data={news}
            keyExtractor={({ id }, index) => id.toString() }
            contentContainerStyle={{padding: 8}}
            ListHeaderComponent={() => (
                <Text style={{fontWeight: 'bold', fontSize: 30, marginBottom: 8}}>รายการข่าว</Text>
            )}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    onPress={() => {navigation.navigate('News', { ...item })}}
                    style={{ backgroundColor: 'lightgray', marginBottom: 8, padding: 15, borderRadius: 10 }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
                    <Text style={{ fontSize: 10, marginBottom: 8,}}  numberOfLines={1}>{`สร้างเมื่อ ${item.date}`}</Text>
                    <Text style={{ marginBottom: 8,}} numberOfLines={1}>{item.detail}</Text>
                    <Text style={{ fontSize: 10 }} numberOfLines={1}>{`โดย ${item.author}`}</Text>
                </TouchableOpacity>
            )}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });