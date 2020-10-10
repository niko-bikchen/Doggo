// pages/index.js
import gql from 'graphql-tag';
import React from "react";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {useState,useEffect, useRef, useCallback} from 'react'
// import { getDataFromTree } from '@apollo/react-ssr'; useRef useEffect useImperativeHandle

const QUERY = gql`
    query allCharacters {
        characters {
            results {
                id
                name
            }
        }
    }
`;
export async function getStaticProps(context) {
    const client = new ApolloClient({
        uri: 'https://rickandmortyapi.com/graphql',
        cache: new InMemoryCache()
    });
    const data = await client.query({
        query:QUERY
    })
    return {
        props: {data:data.data}, // will be passed to the page component as props
    }
}
//react hooks
const Index = ({data}) => {
    return JSON.stringify(data)
};

export default Index;
