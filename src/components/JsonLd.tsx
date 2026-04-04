export default function JsonLd({ data }: { data: Record<string, any> | Record<string, any>[] }) {
    const schema = Array.isArray(data)
        ? { "@context": "https://schema.org", "@graph": data }
        : data;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
        />
    );
}
