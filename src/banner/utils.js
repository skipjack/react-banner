/**
 * Check if the given link `item` is active
 *
 * @param  {object} item - An item object describing a link
 * @param  {string} url  - The URL to test against
 * @return {bool}        - Whether or not the given item is active
 */
export const isActive = (item = {}, url = '') => {
    if ( typeof item.isActive === 'function' ) {
        return item.isActive(url)

    } else {
        let testUrl = item.url,
            regex = new RegExp(`^${testUrl}/?`)

        return (
            testUrl === url ||
            testUrl !== '/' ? regex.test(url) : false
        )
    }
}