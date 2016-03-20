module Components.Hello where

import Html exposing (..)
import Html.Attributes exposing (..)
import String
import Styles.App exposing (counterCls)

-- hello component
hello model =
  div
    [ class counterCls ]
    [ text ( "Hello, World" ++ ( "!" |> String.repeat model ) ) ]
