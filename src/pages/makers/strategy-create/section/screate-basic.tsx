import React from "react";
import styled from "styled-components";
import { useForm, UseFormRegister } from "react-hook-form";
import { Flex } from "antd-mobile";

type IScreateBasicInput = {
  name: string;
  description: string;
  tags: string;
  startMoney: number;
  backtestFrom: string;
  backtestTo: string;
  fees: number;
  openRange: "public" | "private";
};

const mapNameToPlaceholder = {
  name: "전략 이름",
  description: "전략 설명",
  tags: "전략 테그",
  startMoney: "운용 자금",
  backtestFrom: "백테스트 시작",
  backtestTo: "백테스트 종료",
  fees: "수수료",
  openRange: "공개범위",
};

const ScreateBasic = () => {
  const { register, handleSubmit, watch, formState } =
    useForm<IScreateBasicInput>();

  return (
    <div>
      <form
        style={{ display: "flex", flexFlow: "row nowrap" }}
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input
          type="text"
          placeholder={mapNameToPlaceholder["name"]}
          {...register("name", {
            required: true,
          })}
        ></input>
        <input
          type="text"
          placeholder={mapNameToPlaceholder["description"]}
          {...register("description", {
            required: true,
          })}
        ></input>
        <input
          type="text"
          placeholder={mapNameToPlaceholder["fees"]}
          {...register("fees", {
            required: true,
          })}
        ></input>
        <input
          type="text"
          placeholder={mapNameToPlaceholder["backtestFrom"]}
          {...register("backtestFrom", {
            required: true,
          })}
        ></input>
        <input
          type="text"
          placeholder={mapNameToPlaceholder["backtestTo"]}
          {...register("backtestTo", {
            required: true,
          })}
        ></input>
        <input
          type="text"
          placeholder={mapNameToPlaceholder["fees"]}
          {...register("fees", {
            required: true,
          })}
        ></input>
        <select {...register("openRange")}>
          {["public", "private"].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

const SScreateBasic = styled.div``;

export default ScreateBasic;
