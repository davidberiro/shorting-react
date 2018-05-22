import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Layout } from 'antd'

const { Content } = Layout

const borderRadius = 5
const DEFAULT_BACKGROUND_COLOR = '#FAFBFC'

const CardContainer = styled(Content)`
  margin: 25px 10px;
  background: #fff;
  border-radius: ${borderRadius}px;
  box-shadow: -7px 8px 16px 0 rgba(55, 70, 95, 0.07);
`

const ContentCard = ({
  noPadding,
  children,
  header,
  footer,
  backgroundColor,
}) => {
  const paddingTop = header ? 18 : 34
  return (
    <div>
      <CardContainer>
        {header ? (
          <div
            style={{
              backgroundColor,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            {header}
          </div>
        ) : null}
        <div
          style={
            noPadding
              ? { padding: 0, paddingTop }
              : { padding: '34px 48px', paddingTop }
          }
        >
          {children}
        </div>
        {footer ? (
          <div
            style={{
              backgroundColor,
              borderBottomLeftRadius: borderRadius,
              borderBottomRightRadius: borderRadius,
            }}
          >
            {footer}
          </div>
        ) : null}
      </CardContainer>
    </div>
  )
}

ContentCard.propTypes = {
  noPadding: PropTypes.bool,
  children: PropTypes.element,
  header: PropTypes.element,
  footer: PropTypes.element,
  backgroundColor: PropTypes.string,
}

ContentCard.defaultProps = {
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
}

export default ContentCard
