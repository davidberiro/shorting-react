import React, { PureComponent } from 'react'
import TokenTable from './TokenTable'
import TokenGiver from './TokenGiver'
import TokenRate from './TokenRate'
import TokenAllowance from './TokenAllowance'
import ContentCard from '../../components/cards/ContentCard'

class Tokens extends PureComponent {
  render() {
    return (
      <div>
      <ContentCard>
        <TokenTable />
      </ContentCard>
      <ContentCard>
        <TokenGiver />
      </ContentCard>
      <ContentCard>
        <TokenAllowance />
      </ContentCard>
      <ContentCard>
        <TokenRate />
      </ContentCard>
      </div>
    )
  }
}

export default Tokens