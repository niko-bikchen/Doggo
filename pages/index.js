import gql from 'graphql-tag';
import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import withHttpsRedirect from "../HoCs/withHttpsRedirect";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon } from "mdbreact";

import Header from '../components/Header/Header';

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
            <MDBJumbotron style={{ padding: 0 }}>
                <MDBCol className="text-white text-center py-5 px-4" style={{ backgroundImage: 'url(landing_bg.png)' }}>
                    <MDBCol className="py-5">
                        <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">Create your beautiful website with MDBootstrap</MDBCardTitle>
                        <p className="mx-5 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                        optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!
                </p>
                        <MDBBtn outline color="white" className="mb-5"><MDBIcon icon="clone" className="mr-2"></MDBIcon> View project</MDBBtn>
                    </MDBCol>
                </MDBCol>
            </MDBJumbotron>
        </div>
    )
};

export default withHttpsRedirect(Index);
