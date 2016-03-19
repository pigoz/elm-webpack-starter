module Components.Hello where

import Html exposing (..)
import Html.Attributes exposing (..)
import String

-- hello component
hello model styles =
  div
    [ class styles.home.counter ]
    [ text ( "Hello, World" ++ ( "!" |> String.repeat model ) ) ]
