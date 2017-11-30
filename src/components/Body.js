import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import expo, { FileSystem, Video } from 'expo';
import FullImage from './temp1_fullimage';
import ImageButtons from './temp2_imagebuttons';
import TextImage from './temp3_textimage';
import FullText from './temp4_fulltext';
import Swiper from 'react-native-swiper';


class Body extends Component {

    componentWillMount() {

    }

    filterBody() {

        return this.props.pages.map(page => {
            let document = false;
            let video = false;
            let templateId = page.templateId;
            let img = '';

            if (page.files) {
                page.files.map(file => {
                     
                        img = FileSystem.documentDirectory + file.fileId + '.' + file.ext;
                    
                })
            }

    
              for(var i=0; i<page.files.length; i++){
            
                console.log(page.files[i].ext);
            if (page.files[i].ext=='pdf'){
              document = true;
             
            }else if(page.files[i].ext=='mp4'){
                    video = true;
            }
        
          }
           console.log(img);
           console.log(video);
            let title = page.title;
            let subtitle = page.subtitle;
            let text = page.text;
            

            switch (templateId) {
                case '1':
                    return <FullImage key={page.pageId} img={img} />

                    break;
                case '2':
                    return <ImageButtons key={page.pageId} templateTitle={title} subtitle={subtitle} img={img} video={video} document={document} />
                    break;

                case '3':
                    return <TextImage key={page.pageId} templateTitle={title} subtitle={subtitle} img={img} text={text} />
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
                
                <Swiper showsButtons={false} width={'100%'}>
                    {this.filterBody()}
                </Swiper>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    bodyCont: {
        width: '100%',
        height: '86%'
    }
});

export default Body;