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
    const [errors, setErrors] = useState<any>({});
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
        let trans_value: any = value;
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

        if (e.target.getAttribute('is_certification')) {
            trans_value = value.replace(/[^0-9]/g, '').replace(/(^1[0-9]{6})$/, '$123456');
        }

        if (e.target.getAttribute('is_single_check')) {
            trans_value = checked + '';
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

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, options: any) => {
        const { name } = e.target;
        let file: any = null;
        if (e.target.files !== null) {
            file = e.target.files[0];
        }

        // 1. 확장자 체크
        var ext = file.name.split('.').pop().toLowerCase();
        if (options.file_type === undefined || options.file_type == '' || options.file_type == 'img') {
            if (['jpeg', 'jpg', 'svg', 'png', 'gif'].indexOf(ext) == -1) {
                alert(ext + '파일은 업로드 하실 수 없습니다.');
                e.target.value = '';
                return false;
            }
        } else if (options.file_type == 'all') {
            if (['jpeg', 'jpg', 'svg', 'png', 'gif', 'pdf', 'csv', 'zip', 'xlsx', 'xls', 'docx', 'doc', 'pptx', 'ppt', 'hwp'].indexOf(ext) == -1) {
                alert(ext + '파일은 업로드 하실 수 없습니다.');
                e.target.value = '';
                return false;
            }
        }

        const formData = new FormData();
        formData.append('file_object', file);
        formData.append('upload_path', options.upload_path);

        try {
            const { data } = await api.post(`/be/aws/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            const input_name = (name + '').replace('-file', '');
            const copy = { ...values };
            copy[input_name] = data.s3_url;
            copy[input_name + '_fakename'] = data.fake_name;
            setValues(copy);

            e.target.value = '';
        } catch (e: any) {}
    };

    const handleChangeDateRange = async (newValue: any, element: HTMLInputElement) => {
        var name = element.getAttribute('name') + '';
        setValues({ ...values, [name]: newValue });
    };

    const handleChangeDate = async (newValue: any, name: string, date: any) => {
        setValues({ ...values, [name]: newValue });
    };

    const handleUploadImageEditor = async (blob: any, callback: any) => {
        const formData = new FormData();
        formData.append('file_object', blob);
        formData.append('upload_path', '/board/editor/' + dateformat());
        try {
            const { data } = await api.post(`/be/aws/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            callback(data.s3_url, 'w-full');
        } catch (e: any) {}
    };

    const handleCheckboxGroup = (e: any) => {
        var name = e.target.getAttribute('name') + '';
        if (e.target.checked) {
            setValues({ ...values, [name]: [...values[name], e.target.value] });
        } else {
            setValues({ ...values, [name]: s.values[name].filter((key: any) => key !== e.target.value) });
        }
    };

    const handleCheckboxGroupForInteger = (e: any) => {
        var name = e.target.getAttribute('name') + '';
        if (e.target.checked) {
            setValues({ ...values, [name]: [...values[name], checkNumeric(e.target.value)] });
        } else {
            setValues({ ...values, [name]: s.values[name].filter((key: any) => checkNumeric(key) !== checkNumeric(e.target.value)) });
        }
    };

    const fn: any = {};
    fn.handleChange = handleChange;
    fn.handleSubmit = handleSubmit;
    fn.handleUploadImageEditor = handleUploadImageEditor;
    fn.handleChangeDateRange = handleChangeDateRange;
    fn.handleChangeDate = handleChangeDate;
    fn.handleTextAreaChange = handleTextAreaChange;
    fn.handleCheckboxGroup = handleCheckboxGroup;
    fn.handleCheckboxGroupForInteger = handleCheckboxGroupForInteger;
    fn.handleFileUpload = handleFileUpload;

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
    attrs.is_certification = { is_certification: 'true' };
    attrs.is_single_check = { is_single_check: 'true' };

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
