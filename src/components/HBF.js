import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, Modal, TouchableHighlight } from 'react-native';
import expo, { FileSystem, Video } from 'expo';
import Header from './Header';
import Footer from './Footer';
import MenuList from './MenuList';
import Body from './Body';
import FullImage from './temp1_fullimage';
import ImageButtons from './temp2_imagebuttons';
import TextImage from './temp3_textimage';
import FullText from './temp4_fulltext';

class HBF extends Component {

    state = {
        visible: false,
        modalVisible: true
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        if (this.props.from == 'pocetna') {
            return (
                <View style={styles.container}>
                    <Header />

                    <View style={styles.content}>

                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: 'https://cdnstorevoestalpine.blob.core.windows.net/images/508015/Open_CMS_Stage_MD/Railway_Systems_-_Image_Zug.jpg' }} />
                        
                        <View style={styles.content2}>
                            <TouchableOpacity style={styles.videotour} onPress={this.openVideos}><View style={styles.content3}><Image style={styles.ico2} source={require('./ico/play-button.png')} /><Text style={{ color: 'white', fontSize: 18, marginTop: 10 }}>VIDEOTOUR</Text></View></TouchableOpacity>
                        </View>
                    </View>

                    {this.state.visible &&
                        <MenuList data={global.globalJson} from={this.props.from} />
                    }
                    <Footer data={this.state.contentJson} onPress={() => { this.state.visible ? this.setState({ visible: false }) : this.setState({ visible: true }); }} />

                </View>


            );
        } else {
            return (
                <View>
                    <Header title={this.props.from.title} />

                    <Body pages={this.props.filtered} />
                    


                    {this.state.visible &&
                        <MenuList data={global.globalJson} from={this.props.from.menuId} />
                    }



                    <Footer data={this.state.contentJson} onPress={() => { this.state.visible ? this.setState({ visible: false }) : this.setState({ visible: true }); }} />
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#4169e1',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    content: {
        backgroundColor: 'white',
        width: '100%',
        flex: 1,
        position: 'relative',
    },
    content2: {
        position: 'absolute',
        justifyContent: 'flex-start',
        marginLeft: '15%'

    },
    content3: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '15%'
    },
    videotour: {
        backgroundColor: '#4169e1',
        width: 270,
        height: 39,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 90,
        paddingTop: 50
    },
    ico2: {
        width: 24,
        marginRight: 20,
        height: 24,
        marginTop: 10
    }
});

export default HBF;

/*
<Body />
<Footer />
*/