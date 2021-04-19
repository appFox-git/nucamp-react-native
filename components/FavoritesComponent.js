import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    favorites: state.favorites,
  };
};

// No state updates will be made, so mapDispatchToProps not needed.

class Favorites extends Component {
  // set stack navigator header title.
  static navigationOptions = {
    title: "My Favorites",
  };

  // navigate to CampsiteInfo component when item is selected by user.
  render() {
    const { navigate } = this.props.navigation;
    const renderFavoriteItem = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          leftAvatar={{ source: { uri: baseUrl + item.id } }}
          onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })}
        />
      );
    };

    // call Loading component to be displayed while loading data.
    if (this.props.campsites.isLoading) {
      return <Loading />;
    }
    if (this.props.campsites.errMess) {
      return (
        <View>
          <Text>{this.props.campsites.errMess}</Text>
        </View>
      );
    }

    // return filtered flat list of only items that have been "favorited".
    // Give Flatlist renderItem prop.
    return (
      <FlatList
        data={this.props.campsites.campsites.filter((campsite) =>
          this.props.favorites.includes(campsite.id)
        )}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

// connect to redux state
export default connect(mapStateToProps)(Favorites);
