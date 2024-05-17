/**
 *
 * Loading
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading component displays loading animation.
 *
 * @date 09/05/2024 - 16:37:00
 *
 * @param {Object} props - The component props.
 * @param {string} props.height - height prop.
 * @param {string} props.width - width prop.
 * @param {string} props.fill - fill prop.
 * @returns {JSX.Element} The Loading component.
 */
function Loading({ height, width, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 50 50"
      xmlSpace="preserve"
      aria-label="loading"
    >
      <path
        fill={fill}
        d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

Loading.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  fill: PropTypes.string
};

Loading.defaultProps = {
  height: '40px',
  width: '40px',
  fill: '#000'
};

export default Loading;
