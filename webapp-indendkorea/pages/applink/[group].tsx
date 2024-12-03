import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkNumeric, getAgentDevice, getMobileDeviceOS } from '@/libs/utils';
import { api, setContext } from '@/libs/axios';

const AppLink: NextPage = (props: any) => {
    const router = useRouter();
    const [posts, setPosts] = useState<any>(props.response.list);

    useEffect(() => {
        if (props) {
            setPosts(props.response.list);
            if (props.response.code) {
                if (props.response.code == 200) {
                    mobileCheck();
                } else {
                    alert(props.response.msg);
                    router.back();
                }
            }
        }
    }, [props]);

    // 모바일 체크
    const mobileCheck = () => {
        if (props.device == 'mobile') {
            goLink('');
        } else {
            alert('모바일에서만 이용 가능합니다. 다시 시도해 주세요.');
        }
    };

    const goLink = (app_link: any) => {
        try {
            let is_fail = false;
            if (app_link == '') {
                //?uid=35 를 보고 리스트에서 app_link 찾기
                props.response.list.map((v: any, i: number) => {
                    if (v.uid == checkNumeric(router.query.uid)) {
                        // window.location = v.app_link;
                        is_fail = location_href(v.app_link);
                    }
                });
            } else {
                // window.location = app_link;
                is_fail = location_href(app_link);
            }

            if (is_fail) {
                if (props.device_os == 'ios') {
                    setTimeout(function () {
                        window.location = posts[0].ios_store;
                    }, 1000);
                } else if (props.device_os == 'aos') {
                    setTimeout(function () {
                        window.location = posts[0].aos_store;
                    }, 1000);
                }
            }
        } catch (e) {
            alert(e);
        }
    };

    const location_href = (app_link: any) => {
        window.location = app_link;
        return true;
    };

    return (
        <>
            {props.device == 'desktop' ? (
                <div className="">
                    <h5>
                        <strong>모바일에서만 접속이 가능합니다</strong>
                    </h5>
                </div>
            ) : (
                <>
                    {posts.map((v: any, i: number) => (
                        <div key={i}>
                            <div
                                onClick={() => {
                                    goLink(v.app_link);
                                }}
                            >
                                <img alt="img" src={v.banner} className="w-full pb-1" />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    const device = getAgentDevice(ctx);

    var request: any = {
        group_uid: ctx.query.group,
        uid: typeof ctx.query.uid === 'undefined' ? '0' : ctx.query.uid,
    };

    var response: any = {};
    try {
        const { data } = await api.post(`/be/welfare/applink/deeplink/app/read`, request);
        response = data;
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response, device: device, device_os: getMobileDeviceOS(ctx) },
    };
};

export default AppLink;
