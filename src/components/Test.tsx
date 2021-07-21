import React from "react";
import styled from "styled-components";
import { GqlPrac02 } from "components/test/gql-prac/gql-prac-02";
import { GqlPrac03 } from "components/test/gql-prac/gql-prac-03";
import { GqlPrac04 } from "components/test/gql-prac/gql-prac-04";
import { GqlPrac05 } from "components/test/gql-prac/gql-prac-05";
import { GqlPrac06 } from "components/test/gql-prac/gql-prac-06";

const Test = () => {
  return (
    <STest>
      <h2>Test</h2>
      <GqlPrac06 />
      {/* <GqlPrac05 /> */}
      <hr />
      {/* <GqlPrac04 /> */}
      <hr />
      <GqlPrac02 />
      <hr />
      {/* <GqlPrac03 /> */}
      <hr />
    </STest>
  );
};

export default Test;

const STest = styled.div`
  color: ${(props) => props.theme.ColorMain};
`;
