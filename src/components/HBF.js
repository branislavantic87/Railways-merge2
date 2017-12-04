import React, { Component } from 'react';
import { View } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import MenuList from './MenuList';
import Body from './Body';
import Search from './Search';
import SettingsComponent from '../../Settings';


class HBF extends Component {

    state = {
        visibleMenu: false,
        visibleSearch: false
    }

    render() {
        if (this.props.from == 'ab') {
            return (
                <View>
                    <Header />
                    <SettingsComponent />

                    {this.state.visibleMenu &&
                        <MenuList data={global.globalJson} from={this.props.from.menuId} />
                    }

                    <Footer onPress={() => { this.state.visibleMenu ? this.setState({ visibleMenu: false }) : this.setState({ visibleMenu: true }); }} />
                </View>
            );
        } else {
            return (
                <View>
                    <Header title={this.props.from.title} onPress={() => { this.state.visibleSearch ? this.setState({ visibleSearch: false }) : this.setState({ visibleSearch: true }) }} />

                    {this.state.visibleSearch &&
                        <Search />
                    }

                    <Body pages={this.props.filtered} />

                    {this.state.visibleMenu &&
                        <MenuList data={global.globalJson} from={this.props.from.menuId} />
                    }

                    <Footer onPress={() => { this.state.visibleMenu ? this.setState({ visibleMenu: false }) : this.setState({ visibleMenu: true }); }} />

                </View>
            );
        }
    }

}



export default HBF;

