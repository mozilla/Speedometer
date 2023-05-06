import Image from "next/image";

export default function ArticleImage({ image, className }) {
    if (!image)
        return null;

    return (
        <div className="article-image-container">
            <Image className={className} src={image.src} width={image.width} height={image.height} alt={image.alt} />
        </div>
    );
}
