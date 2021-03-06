import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import VB from './VideoBtn';
import DB from './DocBtn';

export default class ImageButtons extends Component {

    state = {
        videoPath: [],
        documentPath: []
    };

    componentWillMount() {
        let videos = this.props.files.filter(file => {
            return file.substring(file.length - 3, file.length) == 'mp4'
        })

        let documents = this.props.files.filter(file => {
            return file.substring(file.length - 3, file.length) == 'pdf'
        })

        this.setState({ videoPath: videos, documentPath: documents });
    }

    render() {
        console.log(this.state.documentPath);
        return (
            <View style={styles.mainView}>

                <View style={styles.body}>

                    <View>
                        <Text style={[styles.headingText, styles.headingMain]}>{this.props.templateTitle}</Text>
                        <Text style={styles.headingText}>{this.props.subtitle}</Text>
                    </View>

                    <View style={styles.contentContainer}>

                        <View style={styles.contentPic}>

                            <Image resizeMethod='resize' style={{ width: '100%', height: '100%' }} source={{ uri: this.props.files.find(file => file.substring(file.length - 3, file.length) == 'jpg' || file.substring(file.length - 3, file.length) == 'png') }} />

                            <View style={styles.ButtonContainer}>


                                {this.state.videoPath.length > 0 && <VB videouri={this.state.videoPath[0]} />}
                                {this.state.documentPath.length > 0 && <DB documenturi={this.state.documentPath[0]} />}


                            </View>

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
        paddingLeft: 10,
        paddingRight: 10,
    },
    headingText: {
        color: '#1496ba',
        fontSize: 15,
        paddingBottom: 10,
        paddingLeft: 30
    },
    headingMain: {
        paddingTop: 20,
        paddingBottom: 4,
        fontSize: 25
    },
    contentContainer: {
        marginTop: 20,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        marginBottom: 10,
        position: 'relative',
    },
    contentPic: {
        width: '100%',
        height: '100%',
        backgroundColor: '#e5e5e5',
        position: 'relative',
        alignItems: 'center'
    },
    ButtonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: '51%',

    },
});

