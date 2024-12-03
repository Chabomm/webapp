import dynamic from 'next/dynamic';
const CKEditor = dynamic(() => import('@/components/editor/CKEditor').then(e => e.default), {
    ssr: false,
});

export default function CKEditorPage() {
    return (
        <>
            <section className="flex flex-col gap-6">
                admin
                <h2 className="text-4xl font-semibold tracking-tight">CKEditor</h2>
            </section>
            <hr className="border-t border-accents-2 my-6" />
            <section className="flex flex-col gap-3 h-4/5">
                In this example CKBox is integrated with CKEditor. With CKBox plugin, CKEditor will upload files directly to your CKBox environment. Use icon in the top-left corner
                of the editor to open CKBox as a file picker.
                <CKEditor />
            </section>
        </>
    );
}
