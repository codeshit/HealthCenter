import React, { Component } from "react";
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import baseStyles from '../styles/base.css';
export default class BaseComponent extends Component {
    goto(where, data) {
        const { navigate } = this.props.navigation;
        return navigate(where, data);
    }

    goBack(key) {
        if (typeof key == "string") {
            this.props.navigation.goBack(key);
        } else this.props.navigation.goBack(null);
    }

    createHeader(props = {}) {
        const { title = 'Title', leftPress = this.goBack, leftBtn = "ios-arrow-back" } = props;
        return (
            <Header>
                <Left style={baseStyles.flexAround}>
                    {leftBtn === false
                        ? null
                        : <Button
                            style={baseStyles.iCtn}
                            transparent
                            onPress={leftPress.bind(this)}
                        >
                             <Icon name={leftBtn} />
                        </Button>}
                </Left>
                <Body style={baseStyles.flexCenter}>
                    <Title>
                        {title}
                    </Title>
                </Body>
                <Right style={baseStyles.flexAround}>
                </Right>
            </Header>
        )
    }
}