import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import LightBox from 'react-native-lightbox';
import HTML from 'react-native-render-html';

export default class TextImage extends Component {
  renderPics() {

    return this.props.files.map((pic, i) => {

      return <View key={i}>
        <LightBox>
          <Image style={styles.swiperPic} source={{ uri: pic }} />
        </LightBox>
      </View>
    })

  }

  render() {

    return (

      <View style={styles.mainView}>

        <View style={styles.body}>

          <View>
            <Text style={[styles.headingText, styles.headingMain]}>{this.props.title}</Text>
            <Text style={styles.headingText}>{this.props.subtitle}</Text>
          </View>

          <View style={styles.contentContainer}>

            <View style={styles.contentText}>
              <ScrollView>
                <HTML html={this.props.text} />
              </ScrollView>
            </View>

            <View style={styles.contentPic}>

              <ScrollView style={{ height: "100%" }} horizontal={true} howsHorizontalScrollIndicator={true} pagingEnabled>
                {this.renderPics()}
              </ScrollView>

            </View>

          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    position: 'relative',
    height: '100%'
  },
  body: {
    height: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  headingText: {
    color: '#1496ba',
    fontSize: 15,
    paddingBottom: 35
  },
  headingMain: {
    paddingTop: 40,
    paddingBottom: 4,
    fontSize: 25
  },
  contentContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: 25,
    alignItems: 'center'
  },
  contentText: {
    flex: 2.5,
    backgroundColor: '#ebeced',
    padding: 20,
    paddingTop: 30
  },
  contentPic: {
    flex: 4.5,
    width: '100%',
    height: '100%',
    marginLeft: 30,
  },
  swiperPic: {
    alignSelf: 'center',
    width: 727,
    height: 600,
  },
});
