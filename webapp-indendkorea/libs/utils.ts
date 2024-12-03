export function cls(...classnames: string[]) {
    return classnames.join(' ');
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

export const openDremHomepage = () => {
    const url = window.open('https://bokjidream.com');
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
