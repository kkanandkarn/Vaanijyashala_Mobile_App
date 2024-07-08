import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputBox from '../../../components/InputBox';
import {TextInput} from 'react-native-gesture-handler';
import images from '../../../assets';
import {fonts} from '../../constant';
import data from '../../../data';
import colors from '../../../constants';

function All({navigation}: any) {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data.Products);
  const [confirm, setConfirm] = useState<string | null>(null);
  const handleSearch = (text: any) => {
    setSearch(text);
    if (text) {
      const newData = data.Products.filter(
        item =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.productId.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredProducts(newData);
    } else {
      setFilteredProducts(data.Products);
    }
  };
  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetails', {productId: item.id})
      }
      style={[
        styles.itemContainer,
        {backgroundColor: item.status === 'Active' ? '#CCC' : '#F2D2BD'},
      ]}>
      <View style={styles.groupText}>
        <Text style={[styles.itemText, {fontWeight: 'bold'}]}>
          {item.name.length > 30
            ? `${item.name.substring(0, 30)}...`
            : item.name}
        </Text>
        <Text style={[styles.itemText, {color: '#E65629', fontWeight: '600'}]}>
          {item.productId}
        </Text>
      </View>
      <View style={styles.groupText}>
        <Text style={styles.itemText}>Qty: {item.qty}</Text>
        <Text style={styles.itemText}>
          &#x20B9; {item.price.toLocaleString()}
        </Text>
      </View>
      <View style={styles.groupText}>
        <Text
          style={[
            styles.itemText,
            {color: item.status === 'Active' ? 'green' : '#E65629'},
          ]}>
          {item.status}
        </Text>
        <TouchableOpacity
          style={styles.iconButtons}
          onPress={() =>
            navigation.navigate('ProductDeleteConfirmModal', {
              id: item.id,
              confirmData: (confirm: any) => {
                setConfirm(confirm);
                if (confirm === 'Yes') {
                  console.log('Yes');
                } else {
                  console.log('No');
                }
              },
            })
          }>
          <Text style={styles.crossIcon}>X</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <View style={styles.searchBox}>
        <TextInput
          keyboardType="default"
          placeholder={'Search by Product name or Product Id'}
          value={search}
          onChangeText={handleSearch}
          style={styles.inputBox}
          maxLength={45}
        />
        <Image source={images.searchIcon} style={styles.searchIcon} />
      </View>

      {filteredProducts.length ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.notFound}>No data found</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    height: 60,
  },
  inputBox: {
    height: '80%',
    backgroundColor: '#F5BBB1',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    alignSelf: 'center',
    paddingLeft: 50,
    color: '#000',
    fontSize: 16,
  },
  searchIcon: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 15,
    left: 20,
  },
  listContainer: {
    marginTop: 10,
    paddingBottom: 30,
  },
  itemContainer: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  groupText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notFound: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_BOLD,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  crossIcon: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  iconButtons: {
    height: 25,
    width: 25,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default All;
