import { CatalogProduct } from '@/types/Product'
import { List, Typography } from 'antd'
import React from 'react'
import ProductCard from './ProductCard'

type PropTypes = {
  isLoading: boolean,
  isError: boolean,
  data: CatalogProduct[],
}

export default function ProductsList({isLoading, isError, data}: PropTypes) {
  if(isLoading) return (
    <Typography.Text style={{textAlign: 'center'}}>
      Loading...
    </Typography.Text>
  )

  if(isError) return (
    <Typography.Text style={{textAlign: 'center'}}>
      No Data Found
    </Typography.Text>
  )
  
  if(data) return (
    <List
      dataSource={data}
      itemLayout="vertical"
      renderItem={(item: CatalogProduct) => (
        <ProductCard key={item.catalogObjectId} item={item} />
      )}
    />
  )
}
