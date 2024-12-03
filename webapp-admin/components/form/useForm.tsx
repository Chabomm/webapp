import { api } from '@/libs/axios';
import React, { useEffect, useState } from 'react';
import validate from '@/components/form/validate';
import { checkNumeric } from '@/libs/utils';

interface Props {
    initialValues?: any;
    onSubmit?: any;
    onCounts?: any;
}

function useForm({ initialValues, onSubmit, onCounts }: Props) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [counts, setCounts] = useState(onCounts);

    useEffect(() => {
        if (submitting) {
            waitingForfetch();
        }
    }, [errors]);

    async function waitingForfetch() {
        if (Object.keys(errors).length === 0) {
            await onSubmit();
        }
        setSubmitting(false);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        setSubmitting(true);
        e.preventDefault();
        setErrors(validate(values));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        const count = e.target.value.length;
        let trans_value = value;
        if (e.target.getAttribute('is_mobile')) {
            trans_value = value
                .replace(/[^0-9]/g, '')
                .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
                .replace('--', '-');
        }

        if (e.target.getAttribute('is_bizno')) {
            trans_value = value
                .replace(/[^0-9]/g, '')
                .replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')
                .replace('--', '-');
        }

        setValues({ ...values, [name]: trans_value });
        setCounts({ ...counts, [name]: count });
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const count = e.target.value.length;
        setValues({ ...values, [name]: value });
        setCounts({ ...counts, [name]: count });
    };

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>, upload_path: string) => {
        const { name, value } = e.target;
        let file: any = null;
        if (e.target.files !== null) {
            file = e.target.files[0];
        }

        const formData = new FormData();
        formData.append('file_object', file);
        formData.append('upload_path', upload_path);

        try {
            const { data } = await api.post(`/be/aws/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            const input_name = (name + '').replace('-file', '');
            setValues({ ...values, [input_name]: data.s3_url });
            e.target.value = '';
        } catch (e: any) {}
    };

    const handleChangeDateRange = async (newValue: any, element: HTMLInputElement) => {
        var name = element.getAttribute('name') + '';
        setValues({ ...values, [name]: newValue });
    };

    const handleChangeDate = async (newValue: any, element: HTMLInputElement) => {
        var name = element.getAttribute('name') + '';
        setValues({ ...values, [name]: newValue.startDate });
    };

    const handleChangeEditor = (ref: any) => {
        const name = ref.name;
        const data = ref.current?.getInstance().getHTML();
        setValues({ ...values, [name]: data });
    };

    const handleUploadImageEditor = async (blob, callback) => {
        const formData = new FormData();
        formData.append('file_object', blob);
        formData.append('upload_path', '/editor/' + dateformat());

        try {
            const { data } = await api.post(`/be/aws/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            callback(data.s3_url, 'w-full');
        } catch (e: any) {}
    };

    const handleCheckboxGroup = e => {
        var name = e.target.getAttribute('name') + '';
        if (e.target.checked) {
            setValues({ ...values, [name]: [...values[name], e.target.value] });
        } else {
            setValues({ ...values, [name]: s.values[name].filter(key => key !== e.target.value) });
        }
    };

    const handleCheckboxGroupForInteger = e => {
        var name = e.target.getAttribute('name') + '';
        if (e.target.checked) {
            setValues({ ...values, [name]: [...values[name], checkNumeric(e.target.value)] });
        } else {
            setValues({ ...values, [name]: s.values[name].filter(key => checkNumeric(key) !== checkNumeric(e.target.value)) });
        }
    };

    const fn: any = {};
    fn.handleChange = handleChange;
    fn.handleImage = handleImage;
    fn.handleSubmit = handleSubmit;
    fn.handleChangeEditor = handleChangeEditor;
    fn.handleUploadImageEditor = handleUploadImageEditor;
    fn.handleChangeDateRange = handleChangeDateRange;
    fn.handleChangeDate = handleChangeDate;
    fn.handleTextAreaChange = handleTextAreaChange;
    fn.handleCheckboxGroup = handleCheckboxGroup;
    fn.handleCheckboxGroupForInteger = handleCheckboxGroupForInteger;

    const s: any = {};
    s.values = values;
    s.setValues = setValues;
    s.errors = errors;
    s.setErrors = setErrors;
    s.submitting = submitting;
    s.setSubmitting = setSubmitting;
    s.counts = counts;
    s.setCounts = setCounts;

    const attrs: any = {};
    attrs.is_mand = { is_mand: 'true' };
    attrs.is_mobile = { is_mobile: 'true' };
    attrs.is_email = { is_email: 'true' };
    attrs.is_bizno = { is_bizno: 'true' };
    attrs.is_password = { is_password: 'true' };

    const dateformat = () => {
        let date, month, year;
        date = new Date().getDate();
        month = new Date().getMonth() + 1;
        year = new Date().getFullYear();
        date = date.toString().padStart(2, '0');
        month = month.toString().padStart(2, '0');
        return `${year}${month}${date}`;
    };

    return { s, fn, attrs };
}

export default useForm;
