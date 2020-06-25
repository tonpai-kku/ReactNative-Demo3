import React, {
    useState,
} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    Text,
    Button,
} from 'react-native';

import axios from 'axios';


export default function AddNewsScreen({navigation}){
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [detail, setDetail] = useState('');

    const [isSending, setSending] = useState(false);

    function sendData(){
        setSending(true);
        const data = {title, author, detail};
        console.log('send data');
        console.log(data);
        axios.post('http://192.168.1.43:3000/add_news', data)
            .then(res => {
                setSending(false);
                console.log(res.data);

                setTitle('');
                setAuthor('');
                setDetail('');
                 
                navigation.goBack();
                return res;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }

    return (
        <ScrollView contentContainerStyle={ styles.container }>
            <Text style={ styles.header }>ส่งข่าว</Text>
            <Text style={ styles.headerDescription }>
                *กรอกรายละเอียดของเนื้อหาข่าวด้านล่าง แล้วจึงกด "ส่ง"
            </Text>
            <TextInput 
                value={title}
                onChangeText={ value => setTitle(value) }
                style={ styles.textInput } 
                placeholder="หัวข้อข่าว"
                editable={!isSending}
            />
            <TextInput 
                value={author}
                onChangeText={ value => setAuthor(value) }
                style={ styles.textInput } 
                placeholder="นามปากกาผู้ส่ง"
                editable={!isSending}
            />
            <TextInput 
                value={ detail }
                onChangeText={ value => setDetail(value) }
                style={ styles.textInput } 
                placeholder="เนื้อหาข่าว" 
                textAlignVertical="top" 
                numberOfLines={10}
                editable={!isSending}
                multiline
            />
            <Text style={ styles.agreementText }>
                * ข้าพเจ้าของยืนยันว่าข้อมูลข่าวข้างต้นจะเป็นไปตามข้อกำหนดของการให้บริการ
            </Text>
            <View style={ styles.buttonContainer }>
                <Button
                    title="ส่ง"
                    onPress={() => sendData() }
                    disabled={isSending}
                />
            </View>
            <View style={ styles.buttonContainer }>
                <Button
                    title="ยกเลิก"
                    onPress={() => navigation.goBack() }
                    disabled={isSending}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { 
        padding: 8,
    },
    header: { 
        fontSize: 30, 
        fontWeight: 'bold',
    },
    headerDescription: { 
        fontSize: 10, 
        marginBottom: 20, 
        marginBottom: 20  
    },
    textInput: {
        backgroundColor: 'white', 
        borderRadius: 10, 
        padding: 10, 
        marginBottom: 8
    },
    agreementText: { 
        fontSize: 10, 
        marginBottom: 16,
        marginTop: 8,
    },
    buttonContainer: { 
        marginBottom: 8, 
    }
});