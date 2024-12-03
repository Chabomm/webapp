export function cls(...classnames: string[]) {
    return classnames.join(' ');
}

export const checkNumeric = (x: any) => {
    try {
        var parsed = parseInt(x.toString().replace(/,/g, ''));
        if (isNaN(parsed)) {
            return 0;
        }
        return parsed;
    } catch (e) {
        return 0;
    }
};

export const null2Blank = (x: any) => {
    try {
        if (typeof x == 'undefined' || String(x) == 'null') {
            return '';
        } else {
            return String(x).trim();
        }
    } catch (e) {
        return '';
    }
};

export const flag2Bool = (x: any) => {
    try {
        if (typeof x === 'boolean') {
            return x;
        } else if (left(x, 1).toUpperCase() == 'T') {
            return true;
        } else if (left(x, 1).toUpperCase() == 'F') {
            return false;
        } else if (left(x, 1).toUpperCase() == 'Y') {
            return true;
        } else if (left(x, 1).toUpperCase() == 'N') {
            return false;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};

// left("abcd",2)
export function left(s: any, c: any) {
    return s.substr(0, c);
}

// right("abcd",2)
export function right(s: any, c: any) {
    return s.substr(-c);
}

// mid("abcd",1,2)
export function mid(s: any, c: any, l: any) {
    return s.substring(c, l);
}

export const openDreamCounsel = () => {
    const url = window.open('https://web.indend.synology.me/dream/counsel', 'counsel', 'width=1350,height=900');
};

export const openSellerRequest = () => {
    const url = window.open('https://web.indend.synology.me/seller/requestv2/request/welfare', 'request', 'width=1350,height=900');
};

export const openIndendHomepage = () => {
    const url = window.open('https://indendkorea.com');
};

export function getCookie(name: any) {
    const cookies = document.cookie;
    if (cookies) {
        const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value ? value[2] : null;
    } else {
        return;
    }
}

export function delCookie(name: string) {
    let date = new Date();
    date.setDate(date.getDate() - 100);
    let Cookie = `${name}=;Expires=${date.toUTCString()}`;
    document.cookie = Cookie;
}

export function getToken(ctx: any) {
    if (typeof ctx === 'undefined' || ctx === null) {
        return getCookie('token');
    } else {
        const { token } = ctx.req?.cookies;
        return token;
    }
}

export function setCookie(name: string, value: string, day: any) {
    const date = new Date();
    date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

// export function naverPopNotice() {
//     setCookie( popName, "done", 1);
//     main_popup.hide();
// }

export function getUserIP(ctx: any) {
    if (typeof ctx === 'undefined' || ctx === null) {
        return '0.0.0.0';
    } else {
        let ip;
        const { req } = ctx;
        if (req?.headers['x-forwarded-for']) {
            ip = (req.headers['x-forwarded-for'] as string).split(',')[0];
        } else if (req?.headers['x-real-ip']) {
            ip = req?.connection.remoteAddress;
        } else {
            ip = req?.connection.remoteAddress;
        }
        return ip;
    }
}

export function elapsedTime(date: any) {
    const start = new Date(date).getTime();
    const end = new Date().getTime();

    const diff = (end - start) / 1000;

    const times = [
        { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
        { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
        { name: '일', milliSeconds: 60 * 60 * 24 },
        { name: '시간', milliSeconds: 60 * 60 },
        { name: '분', milliSeconds: 60 },
    ];

    for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        if (betweenTime > 0) {
            return `${betweenTime}${value.name} 전`;
        }
    }
    return '방금 전';
}

export function getAgentDevice(ctx: any) {
    const UA = ctx.req?.headers['user-agent'];
    const isMobile = Boolean(UA?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    if (isMobile) return 'mobile';
    else return 'desktop';
}

export function getMobileDeviceOS(ctx: any) {
    var varUA = ctx.req?.headers['user-agent'].toLowerCase();
    if (varUA.indexOf('android') > -1) {
        return 'aos';
    } else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
        return 'ios';
    } else {
        return 'other';
    }
}

export function Unix_timestampConv() {
    return Math.floor(new Date().getTime() / 1000);
}

export function staticReplace(response: string, ctx: any) {
    let return_value = response;
    return_value = return_value.replaceAll('#{DEVICE}', getAgentDevice(ctx));
    return return_value;
}
