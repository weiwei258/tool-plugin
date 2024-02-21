import axios from 'axios';
import type FormData from 'form-data';
export declare const post: (url: string, formData: FormData) => Promise<axios.AxiosResponse<any, any>>;
