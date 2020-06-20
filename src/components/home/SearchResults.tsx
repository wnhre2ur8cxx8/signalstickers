import {styled} from 'linaria/react';
import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Waypoint} from 'react-waypoint';
import * as R from 'ramda';

import StickerContext from 'contexts/StickersContext';
import {StickerPackPartial} from 'etc/types';
import StickerPackPreviewCard from './StickerPackPreviewCard';


// ----- Styles ----------------------------------------------------------------

const StickerPackList = styled.div`
  & a {
    &:hover {
      text-decoration: none;
    }
  }
`;


// ----- Component -------------------------------------------------------------

/**
 * How many items we will load each time loadMore() is called.
 */
const PAGE_SIZE = 64;


const StickerPackListComponent = () => {
  const {searchResults} = useContext(StickerContext);
  // Used by Waypoint to persist the component across re-renders.
  const [cursor, setCursor] = useState(0);
  // Subset of total search results that have been rendered.
  const [renderedSearchResults, setRenderedSearchResults] = useState<Array<StickerPackPartial>>([]);


  /**
   * Adds PAGE_SIZE items from searchResults to renderedSearchResults and
   * updates the cursor.
   */
  const loadMore = React.useCallback(() => {
    // If we have rendered all search results, bail.
    if (renderedSearchResults.length >= searchResults.length) {
      return;
    }

    const newCursor = cursor + PAGE_SIZE;
    setCursor(newCursor);
    setRenderedSearchResults(R.take(newCursor, searchResults));
  }, [
    cursor,
    searchResults,
    renderedSearchResults
  ]);


  /**
   * [Effect] When the list of search results is updated, re-set our rendered
   * search results and cursor.
   */
  React.useEffect(() => {
    setCursor(0);
    setRenderedSearchResults([]);
    loadMore();
  }, [searchResults]);


  // ----- Render --------------------------------------------------------------

  return (
    <StickerPackList className="row">
      {renderedSearchResults.map(({meta, manifest}) => (
        <Link className="col-6 col-md-4 col-lg-3 mb-4" key={meta.id} to={`/pack/${meta.id}`}>
          <StickerPackPreviewCard stickerPack={{meta, manifest}} />
        </Link>
      ))}
      <Waypoint key={cursor} onEnter={loadMore} bottomOffset="-500px" />
    </StickerPackList>
  );
};


export default StickerPackListComponent;
