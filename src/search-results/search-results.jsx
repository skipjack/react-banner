// Foundational
import React from 'react'
import Utils from 'docsearch.js/dist/npm/src/lib/utils'

// Styling
import 'docsearch.js/dist/cdn/docsearch.css'
import './search-results-style'

// BEM block name
const block = 'search-results'


export default class SearchResults extends React.Component {
    render() {
        let { results } = this.props,
            suggestions = this._formatHits(results)

        return (
            <div className={ `${block} algolia-autocomplete` }>
                { suggestions.map((suggestion, index) => {
                    let suggestionPrefix = 'algolia-docsearch-suggestion',
                        categoryMod = suggestion.isCategoryHeader ? `${suggestionPrefix}__main` : '',
                        subcategoryMod = suggestion.isSubCategoryHeader ? `${suggestionPrefix}__secondary` : ''

                    return (
                        <div 
                            key={ index }
                            className={ `${suggestionPrefix} ${categoryMod} ${subcategoryMod}` }>
                            <div className={ `${suggestionPrefix}--category-header` }>
                                <span 
                                    className={ `${suggestionPrefix}--category-header-lvl0` }
                                    dangerouslySetInnerHTML={{
                                        __html: suggestion.category
                                    }} />
                            </div>
                            <div className={ `${suggestionPrefix}--wrapper` }>
                                <div className={ `${suggestionPrefix}--subcategory-column` }>
                                    <span
                                        className={ `${suggestionPrefix}--subcategory-column-text` }
                                        dangerouslySetInnerHTML={{
                                            __html: suggestion.subcategory
                                        }} />
                                </div>

                                { suggestion.isTextOrSubcatoryNonEmpty ? (
                                    <a 
                                        className={ `${block}__link ${suggestionPrefix}--content` }
                                        href={ suggestion.url }>
                                        <div className={ `${suggestionPrefix}--subcategory-inline` }>
                                            { suggestion.subcategory }
                                        </div>
                                        <div 
                                            className={ `${suggestionPrefix}--title` }
                                            dangerouslySetInnerHTML={{
                                                __html: suggestion.title
                                            }} />
                                        { suggestion.text ? (
                                            <div 
                                                className={ `${suggestionPrefix}--text` }
                                                dangerouslySetInnerHTML={{
                                                    __html: suggestion.text
                                                }} />
                                        ) : null }
                                    </a>
                                ) : null }
                            </div>
                        </div>
                    )
                })}

                { suggestions.length === 0 ? (
                    <div className="algolia-docsearch-suggestion">
                        <div className="algolia-docsearch-suggestion--wrapper">
                            <div className="algolia-docsearch-suggestion--content algolia-docsearch-suggestion--no-results">
                                <div className="algolia-docsearch-suggestion--title">
                                    <div className="algolia-docsearch-suggestion--text">
                                        No results found for query <b>"{ this.props.query }"</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null }

                <div className={ `${block}__footer algolia-docsearch-footer` }>
                    Search by
                    <a 
                        className="algolia-docsearch-footer--logo"
                        href="https://www.algolia.com/docsearch">
                        Algolia
                    </a>
                </div>
            </div>
        )
    }

    _formatHits(receivedHits) {
        const clonedHits = Utils.deepClone(receivedHits)
        const hits = clonedHits.map(hit => {
            if (hit._highlightResult) {
                hit._highlightResult = Utils.mergeKeyWithParent(
                    hit._highlightResult,
                    'hierarchy'
                )
            }
            
            return Utils.mergeKeyWithParent(hit, 'hierarchy')
        })

        // Group hits by category / subcategory
        let groupedHits = Utils.groupBy(hits, 'lvl0')

        for ( let level in groupedHits ) {
            const collection = groupedHits[level]
            const groupedHitsByLvl1 = Utils.groupBy(collection, 'lvl1')
            const flattenedHits = Utils.flattenAndFlagFirst(
                groupedHitsByLvl1,
                'isSubCategoryHeader'
            )

            groupedHits[level] = flattenedHits
        }

        groupedHits = Utils.flattenAndFlagFirst(groupedHits, 'isCategoryHeader')

        // Translate hits into smaller objects to be send to the template
        return groupedHits.map(hit => {
            const url = this._formatURL(hit)
            const category = Utils.getHighlightedValue(hit, 'lvl0')
            const subcategory = Utils.getHighlightedValue(hit, 'lvl1') || category
            const displayTitle = Utils
                .compact([
                    Utils.getHighlightedValue(hit, 'lvl2') || subcategory,
                    Utils.getHighlightedValue(hit, 'lvl3'),
                    Utils.getHighlightedValue(hit, 'lvl4'),
                    Utils.getHighlightedValue(hit, 'lvl5'),
                    Utils.getHighlightedValue(hit, 'lvl6')
                ])
                .join(
                    '<span class="aa-suggestion-title-separator" aria-hidden="true"> › </span>'
                )

            const text = Utils.getSnippetedValue(hit, 'content')
            const isTextOrSubcatoryNonEmpty = (subcategory && subcategory !== '') ||
                (displayTitle && displayTitle !== '')
            const isLvl1EmptyOrDuplicate = !subcategory ||
                subcategory === '' ||
                subcategory === category
            const isLvl2 = displayTitle &&
                displayTitle !== '' &&
                displayTitle !== subcategory
            const isLvl1 = !isLvl2 &&
                (subcategory && subcategory !== '' && subcategory !== category)
            const isLvl0 = !isLvl1 && !isLvl2

            return {
                isLvl0,
                isLvl1,
                isLvl2,
                isLvl1EmptyOrDuplicate,
                isCategoryHeader: hit.isCategoryHeader,
                isSubCategoryHeader: hit.isSubCategoryHeader,
                isTextOrSubcatoryNonEmpty,
                category,
                subcategory,
                title: displayTitle,
                text,
                url
            }
        })
    }

    _formatURL(hit) {
        const { url, anchor } = hit

        if (url) {
            const containsAnchor = url.indexOf('#') !== -1

            if (containsAnchor) return url
            else if (anchor) return `${hit.url}#${hit.anchor}`
            return url
        } else if (anchor) return `#${hit.anchor}`

        /* eslint-disable */
        console.warn('no anchor nor url for : ', JSON.stringify(hit))
        /* eslint-enable */

        return null
    }
}