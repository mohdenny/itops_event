import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    body: {
        flexDirection: 'row'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        alignContent: 'center'
    },
    text: {
        margin: 8,
        fontSize: 14,
        textAlign: 'justify',
    },
    footer: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    }
});

// Create Document Component
const PdfDocument = ({ event }) => (
    <Document>
        <Page size="A4" style={styles.page}>  
            <Text style={styles.title}>
                {event.title}
            </Text>
            <View style={styles.body}>
                <View style={styles.section}>
                    <Text style={styles.text}>Description:</Text>
                    <Text style={styles.text}>Location:</Text>
                    <Text style={styles.text}>Item:</Text>
                    {/* {
                        Array.from(Array(Number(event.items.length - 1)).keys()).map(count => {
                            return (
                                <Text key={count} style={styles.text}>‎‎</Text>
                            )
                        })
                    } */}
                    <Text style={styles.text}>Support:</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>{event.description}</Text>
                    <Text style={styles.text}>{event.location}</Text>
                    {
                        event.items.map((item, index) => {
                            index = 1 + index
                            return (
                                <Text key={item._id} style={styles.text}>{index}. {item.name_item}, {item.fa}, {item.brand}, {item.type}, {item.quantity} unit</Text>
                            )
                        })
                    }
                    {
                        event.supports.map((support, index) => {
                            index = 1 + index
                            return (
                                <Text key={support._id} style={styles.text}>{index}. {support.name_support}</Text>
                            )
                        })
                    }
                </View>
            </View>
            <Text style={styles.footer} fixed>
                IT Event Note
            </Text>
        </Page>
    </Document>
)

export default PdfDocument;