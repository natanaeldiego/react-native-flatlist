import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

class FlatListBasics extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      requestResult: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.listData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  listData() {
    this.setState({
      loading: true,
    });
    try {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then(
          (result) => {
            if (this._isMounted) {
              this.setState({
                requestResult: result,
                loading: false,
              });
            }
          },
          (error) => {
            console.log(error);
            if (this._isMounted) {
              this.setState({
                loading: false,
              });
            }
          },
        );
    } catch (error) {
      console.log(error);
      if (this._isMounted) {
        this.setState({
          loading: false,
        });
      }
    }
  }

  resultList(item) {
    return (
      <View style={{backgroundColor: '#fff', marginBottom: 10}}>
        <Text style={styles.item}>{item.title}</Text>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.requestResult}
          renderItem={({item}) => this.resultList(item)}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#edebeb',
  },
  item: {
    padding: 10,
    fontSize: 15,
    //  height: 44,
    textAlign: 'center',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'gray',
  },
});

export {FlatListBasics};
