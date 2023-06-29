import React, { useEffect, useState } from 'react';
import {
  ClearOutlined,
  LockOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Select, Tooltip } from 'antd';
import Search from 'antd/es/transfer/search';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMunicipalityApi, getRegionApi } from '../../redux/slices/areasSlice';
import { apiOrganizations } from '../../redux/slices/organizationSlice';
const { Option } = Select;

export const BranchFilter: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const regions = useAppSelector(state => state.area.regionList);
  const parentMunicipId = useAppSelector(state => state.area.regionList[0].id);
  console.log('parentMunicipId', parentMunicipId);
  const municiplities = useAppSelector(state => state.area.municipalityList);
  const currentOrganization = useAppSelector(
    state => state.user.currentOrganization
  );

  const handleRegionChange = (value: any) => {
    // dispatch(getRegionApi());
    dispatch(getMunicipalityApi(value));

    console.log('value', value);
  };

  // const filteredData = regions.filter(
  //   item => selectedRegion === '' || item.geoName === selectedRegion
  // );
  // console.log('filteredData', filteredData);

  useEffect(() => {
    dispatch(getRegionApi());
  }, []);

  const { Search } = Input;

  const onFinish = (values: any) => {
    console.log('Finish:', values, currentOrganization);

    let newFilter = { ...values, OrganizationIds: currentOrganization || null };
    dispatch(apiOrganizations(newFilter));
    // form.resetFields();
    // form.resetFields(['regionId', 'municipalityId', 'address']);
    // form.setFieldsValue({
    //   regionId: undefined,
    //   municipalityId: undefined,
    //   address: '',
    // });
  };

  return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item name="regionId">
        <Select
          allowClear
          // value={selectedRegion}
          onChange={handleRegionChange}
          placeholder="რეგიონი"
          style={{ width: 200 }}
        >
          {regions?.map((d: any) => {
            return (
              <Option allowClear key={d.id} value={d.id}>
                {d.geoName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="municipalityId">
        <Select allowClear placeholder="მუნიციპალიტეტი" style={{ width: 180 }}>
          {municiplities?.map((d: any) => {
            return (
              <Option allowClear key={d.id} value={d.id}>
                {d.geoName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item name="address">
        <Input
          // onChange={handleRegionChange}
          placeholder="მისამართი"
        />
      </Form.Item>
      <Form.Item>
        <Button style={{ fontFamily: 'FiraGO' }} type="primary" htmlType="submit">
          ძიება
        </Button>
        <Tooltip title="გასუფთავება">
          <Button
            style={{ marginLeft: 15 }}
            onClick={() => form.resetFields()}
            icon={<ClearOutlined />}
          ></Button>
        </Tooltip>
      </Form.Item>
    </Form>
  );
};
