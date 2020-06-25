import React, {
    useState,
} from 'react';
import { 
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
} from 'react-native';


export default function NewsScreen({ route, navigation }) {
    const [fontScale, setFontScale] = useState(1);
    const { title, date, detail, author } = route.params;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardContainer} style={{ backgroundColor: 'lightgray', marginBottom: 8, padding: 15, borderRadius: 10 }}>
            <Text style={{ fontSize: 20 * fontScale, fontWeight: 'bold' }} >{title}</Text>
            <Text style={{ fontSize: 10 * fontScale, marginBottom: 8,}}  numberOfLines={1}>{`สร้างเมื่อ ${date}`}</Text>
            <Text style={{ marginBottom: 8, fontSize: 14 * fontScale}} >{detail}</Text>
            <Text style={{ fontSize: 10 * fontScale }} numberOfLines={1}>{`โดย ${author}`}</Text>
        </View>
        {/* <View 
            style={{ 
                flex: 1,
                flexDirection: 'row', 
                height: 20, 
                padding: 10,
            }}
        >
            <View style={{flex: 1, padding: 4, paddingLeft: 0,}}>
                <Button title="+" onPress={ () => setFontScale(fontScale +  0.25) }/>
            </View>
            <View style={{flex: 1, padding: 4, paddingLeft: 0,}}>
                <Button title="-" onPress={ () => setFontScale(fontScale - 0.25 !== 0 ? fontScale - 0.25 : fontScale) }/>
            </View>
        </View> */}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
  });