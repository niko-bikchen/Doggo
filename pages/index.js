import gql from 'graphql-tag';
import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import withHttpsRedirect from "../HoCs/withHttpsRedirect";

import Header from '../components/Header';

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
        query: QUERY
    })
    return {
        props: { data: data.data }, // will be passed to the page component as props
    }
}

const Index = ({ data }) => {
    return (
        <div className="Index">
            <Header />
        </div>
    )
};

export default withHttpsRedirect(Index);
