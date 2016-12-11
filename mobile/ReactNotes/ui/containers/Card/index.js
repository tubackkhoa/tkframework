import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import React, { Component, PropTypes } from 'react';

import { Avatar, Card, ListItem, Toolbar } from 'react-native-material-ui';
import Container from 'ReactNotes/ui/components/Container';

const styles = StyleSheet.create({
    textContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    image:{
        width: 200,
        height: 200,
    },
});

const propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

class CardSpec extends Component {
    render() {
        return (
            <Container>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigator.pop()}
                    centerElement={this.props.route.title}
                />
                <ScrollView>
                <Card>
                    <ListItem
                        leftElement={<Avatar text="JM" />}
                        centerElement={{
                            primaryText: 'John Mitri',
                            secondaryText: '3 weeks ago',
                        }}
                    />
                    <View style={styles.textContainer}>
                        <Text>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium,
                            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
                            quasi architecto beatae vitae dicta sunt explicabo.
                        </Text>
                    </View>
                    <Image
                        source={{
                            uri:
                            'https://dantri4.vcmedia.vn/79e4ba3e/zoom/344_258/9bb6d7c338/2016/12/10/t-1481333821915.jpg'}}
                        style={styles.image} />
                </Card>
                <Card>
                    <ListItem
                        leftElement={<Avatar text="MW" />}
                        centerElement={{
                            primaryText: 'Mike Wiliams',
                            secondaryText: '4 weeks ago',
                        }}
                    />
                    <View style={styles.textContainer}>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                            ut aliquip ex ea commodo consequat.
                        </Text>

                    </View>
                </Card>
                </ScrollView>
            </Container>
        );
    }
}

CardSpec.propTypes = propTypes;

export default CardSpec;
