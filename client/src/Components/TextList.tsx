import React, { useState, useEffect } from 'react';
import {TextListPropsAndState} from '../Typing/TextListType'

class TextList extends React.Component<TextListPropsAndState, TextListPropsAndState> {    
    constructor(props: any) {
        super(props);
        const words = props.words
        console.log(`words: ${words}`)
    }

    render() {
        return (
            <>
                <div> 
                    <ul style={{listStyleType:'none'}}>
                        {this.props.words.map((word, idx) => <li key={idx} >{word}</li>)}
                    </ul>
                </div>
            </>
        )
    };
}