import { checkNumeric } from '@/libs/utils';
import xlsx from 'xlsx';

export function sheet_from_array_of_arrays_common(data: any) {
    let borderStyle = {
        top: { style: 'thin', color: { rgb: 'FF000000' } },
        bottom: { style: 'thin', color: { rgb: 'FF000000' } },
        left: { style: 'thin', color: { rgb: 'FF000000' } },
        right: { style: 'thin', color: { rgb: 'FF000000' } },
    };

    var ws = {};
    var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    let objectMaxLength: any = [];
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;

            if (data[R][C] != null) {
                if (data[R][C].length !== undefined) {
                    let col_size_obj: any = {};
                    col_size_obj.wch = getTextLength(data[R][C]) + 2;
                    if (isEmpty(objectMaxLength[C]) || checkNumeric(objectMaxLength[C].wch) < checkNumeric(col_size_obj.wch)) {
                        objectMaxLength[C] = col_size_obj;
                    }
                }
            }

            var cell: any = { v: data[R][C] };
            if (cell.v == null) continue;
            var cell_ref = xlsx.utils.encode_cell({ c: C, r: R });

            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = xlsx.SSF._table[14];
            } else cell.t = 's';

            if (R == 0) {
                // 헤더 영역
                cell.s = {
                    font: {
                        bold: true,
                    },
                    border: borderStyle,
                    alignment: {
                        horizontal: 'center',
                        vertical: 'center',
                    },
                };
            }

            if (R > 0) {
                // 데이터 영역
                cell.s = {
                    border: borderStyle,
                };
            }

            ws[cell_ref] = cell;
        }
    }

    if (range.s.c < 10000000) ws['!ref'] = xlsx.utils.encode_range(range);

    /* add col size */
    ws['!cols'] = [];
    ws['!cols'] = objectMaxLength;

    // ws['!cols'] = fitToColumn(objectMaxLength);
    // function fitToColumn(objectMaxLength) {
    //     // get maximum character of each column
    //     return objectMaxLength.map((a, i) => ({ wch: Math.max(...objectMaxLength.map(a2 => (a2[i] ? a2[i].toString().length : 0))) }));
    //     // a2 = 내용
    // }

    // ws['!cols'] = fitToColumn(data);
    // function fitToColumn(objectMaxLength) {
    //     // get maximum character of each column
    //     return objectMaxLength.map((a, i) => ({ wch: Math.max(...objectMaxLength.map(a2 => (a2[i] ? a2[i].toString().length : 0))) }));
    // }

    // ws['!cols'] = [];
    // for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    //     return buf;
    // }

    return ws;
}

var getTextLength = function (str: string) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length == 6) {
            len++;
        }
        len++;
    }
    return len;
};

const isEmpty = (value: any) => {
    if (value === null) return true;
    if (typeof value === 'undefined') return true;
    if (typeof value === 'string' && value === '') return true;
    if (Array.isArray(value) && value.length < 1) return true;
    if (typeof value === 'object' && value.constructor.name === 'Object' && Object.keys(value).length < 1 && checkNumeric(Object.getOwnPropertyNames(value)) < 1) return true;
    if (typeof value === 'object' && value.constructor.name === 'String' && Object.keys(value).length < 1) return true; // new String()

    return false;
};
