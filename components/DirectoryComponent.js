import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseURL } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        campsites: state.campsites
    };
};

class Directory extends Component {

    // configure text for DirectoryNavigatorScreen title
    static navigationOptions = {
        title: 'Directory'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                    imageSrc={{uri: baseURL + item.image}}
                />
            );
        }
        

        return(
            <FlatList
                data={this.props.campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );

    }    
}

export default connect(mapStateToProps)(Directory);