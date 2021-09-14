import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { IconOutline } from "@ant-design/icons-react-native";
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Header from "../layouts/Header";
export default class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            faq: [],
        };
        this.getAllFaq();
    }

    componentDidMount() {
        this.getAllFaq();
    }

    getAllFaq = () => {
        fetch('http://api.pethos.app/api/v1/user/getAllFaq')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    faq: responseJson.data
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title="سوالات متداول" onBackPress={() => { this.props.navigation.goBack() }} />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // inverted
                    contentContainerStyle={{
                        paddingStart: -1,
                        paddingEnd: 5,
                        marginTop: 10
                    }}
                    data={this.state.faq}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item, index }) => {
                        return (

                            <Collapse isExpanded={(item.id === 0 ? true : false)} style={styles.Collapse}>
                                <CollapseHeader style={{ paddingHorizontal: 10, paddingVertical: 12 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <IconOutline name='left' color='#555' size={16} style={{ marginLeft: 10 }} />
                                        <Text style={styles.question}>{item.question}</Text>
                                        <IconOutline name="question-circle" color='#777' size={20} style={{ marginRight: 10 }} />
                                    </View>
                                </CollapseHeader>
                                <CollapseBody style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Text style={styles.reply}>
                                        {item.reply}
                                    </Text>
                                </CollapseBody>
                            </Collapse>
                        )
                    }
                    }
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    Collapse: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: "#f8f8f8",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 12,
            marginBottom: 10,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 1
    },
    question: {
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 12,
        textAlign: "right",
        color: "#666"
    },
    reply: {
        marginTop: 10,
        marginBottom: 5,
        fontFamily: 'Dana-FaNum-Medium',
        fontSize: 13,
        textAlign: "center",
        marginHorizontal: 10,
        textAlign: 'right',
        color: "#777"
    },
});



