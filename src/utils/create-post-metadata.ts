import { v4 as uuid } from 'uuid';

export const createPostMetadata = ({
    media,
    albumCover,
    albumName,
    albumCoverType,
    attributes,
}: {
    media: object[];
    albumName: string;
    albumCover: string;
    albumCoverType: string;
    // TODO: Add proper attributes type here
    attributes: any;
}) => {
    const metadata = {
        version: '1.0.0',
        metadata_id: uuid(),
        description: '',
        media,
        name: albumName,
        attributes,
        content: null,
        external_url: null,
        image: albumCover,
        imageMimeType: albumCoverType,
        appId: "prnts-bounty",
    };

    return metadata;
};
