import {styled} from 'linaria/react';
import Modernizr from 'modernizr';
import {Link} from 'react-router-dom';
import React, {useEffect} from 'react';
// @ts-ignore (No type definitions exist for this package.)
import Octicon from 'react-octicon';

import {NAVBAR_HEIGHT} from 'etc/constants';

// ----- Styles ----------------------------------------------------------------

/**
 * These styles turn Bootstrap's .modal class into a custom backdrop that does
 * not cover the navbar. We then hide Bootstrap's .modal-backdrop element when
 * the component is mounted.
 */
const NsfwModal = styled.div`
  background: rgba(255, 255, 255, ${() => (Modernizr.backdropfilter ? 0.75 : 1)});
  backdrop-filter: blur(20px);
  margin-top: ${NAVBAR_HEIGHT}px;
  margin-bottom: ${NAVBAR_HEIGHT}px;

  & .modal-dialog {
    min-height: calc(100% - ${Number(NAVBAR_HEIGHT)}px);
    margin: 0 auto ${NAVBAR_HEIGHT}px auto;

    &:before {
      height: 0;
    }
  }

  & .modal-content {
    border-color: rgba(0, 0, 0, 0.12);
    box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.12);
  }

  & .octicon {
    font-size: 1em;
    height: 1em;
    width: 1em;
  }
`;

// ----- Component -------------------------------------------------------------

const NsfwModalComponent: React.FunctionComponent = () => {
  /**
   * Show the modal when the component is rendered for the first time.
   */
  useEffect(() => {
    $('#nsfw-modal').modal({
      show: true,
      // These two settings ensure the modal cannot be dismissed by clicking the
      // backdrop.
      keyboard: false,
      backdrop: 'static'
    });

    // By not adding this class to the markup, we ensure the modal (and our
    // custom backdrop) appear immediately when the component renders. By adding
    // it here, however, we ensure a smooth fade-out animation when the modal is
    // closed.
    $('#nsfw-modal').addClass('fade');

    // We don't use Bootstraps top-level backdrop, so hide it.
    $('.modal-backdrop').css('display', 'none');
  }, []);


  /**
   * Hides the modal when the 'Show pack' button is clicked.
   */
  const onHideNsfwModalClick = () => {
    $('#nsfw-modal').modal('hide');
  };

  // ----- Render --------------------------------------------------------------

  return (
    <NsfwModal id="nsfw-modal" className="modal" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">
              <Octicon name="alert" /> Content Warning
            </h3>
          </div>
          <div className="modal-body">
            <p>
              This pack has been marked <i>Not Safe For Work</i> (<a href="https://www.urbandictionary.com/define.php?term=NSFW" target="_blank" rel="noopener noreferrer">NSFW</a>).
              <br />
              This means that it may contain nudity, sexual content, or other potentially disturbing subject matter.
            </p>
            <p>You should not view this pack at work, or with children around.</p>
          </div>
          <div className="modal-footer">
            <Link to="/" className="btn btn-secondary" title="Go back home">
              Go back home
            </Link>
            <button type="button" className="btn btn-primary" onClick={onHideNsfwModalClick}>
              Show the pack
            </button>
          </div>
        </div>
      </div>
    </NsfwModal>
  );
};


export default NsfwModalComponent;
