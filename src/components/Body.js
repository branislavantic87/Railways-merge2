import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import expo, { FileSystem } from 'expo';
import FullImage from './temp1_fullimage';
import ImageButtons from './temp2_imagebuttons';
import TextImage from './temp3_textimage';
import FullText from './temp4_fulltext';
import Swiper from 'react-native-swiper';


class Body extends Component {


    filterBody() {

        return this.props.pages.map(page => {

            let title = page.title;
            let subtitle = page.subtitle;
            let text = page.text;
            let files = [];
            if (page.files) {
                files = page.files.map(file => {
                    return FileSystem.documentDirectory + file.fileId + '.' + file.ext;
                })
            }
            switch (page.templateId) {
                case '1':
                    return <FullImage key={page.pageId} files={files} />
                    break;

                case '2':
                    return <ImageButtons key={page.pageId} templateTitle={title} subtitle={subtitle} files={files} />
                    break;

                case '3':
                    return <TextImage key={page.pageId} templateTitle={title} subtitle={subtitle} files={files} text={text} />
                    break;

                case '4':
                    return <FullText key={page.pageId} subtitle={subtitle} templateTitle={title} text={text} />
                    break;

                default:
                    console.log('WTF?!');
            }
        })
    }

    render() {
        return (
            <View style={styles.bodyCont}>
        

               <Swiper>
                    {this.filterBody()}
                    </Swiper>
        
            </View>
        );

    }
}

const styles = StyleSheet.create({
    bodyCont: {
    
        backgroundColor: 'white',
        width: '100%',
        height: '86%'
        
    }
});

export default Body;