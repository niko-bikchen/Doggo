import 'simplebar/dist/simplebar.min.css';
import 'fontsource-roboto/300.css';
import 'fontsource-roboto/400.css';
import 'fontsource-roboto/500.css';
import 'fontsource-roboto/700.css';

import './styles/global.css';
import { Provider } from 'react-redux'
import {useStore} from "../lib/store";

export default function MyApp({ Component, pageProps }) {
    const store = useStore({jwt:''})
    return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
}
