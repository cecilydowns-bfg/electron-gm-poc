export const getMacEnglishVariant = (product) => {
    const variant =
        product.variants &&
        product.variants.find((variant) => {
            const platformAttribute = variant.attributes.find(
                (attribute) => attribute.code === 'platform'
            );
            const languageAttribute = variant.attributes.find(
                (attribute) => attribute.code === 'language'
            );

            return (
                platformAttribute.value_index === 2 && // Mac
                languageAttribute.value_index === 1 // English
            );
        });

    if (variant) {
        return {
            sku: product.sku,
            name: variant.product.name,
            description: variant.product.description.html,
            image: variant.product.image_feature_url_custom_
        };
    }
    return null;
};

export default getMacEnglishVariant;
