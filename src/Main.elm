import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing ( onClick )
import Effects exposing (Effects)
import StartApp

import Styles.App exposing (wrapperCls, titleCls, imageCls)
import Components.Hello exposing ( hello )

type Action
  = NoOp
  | Increment
  | Decrement

-- APP KICK OFF!
app = StartApp.start
  { init = init
  , update = update
  , view = view
  , inputs = [ Signal.map (always NoOp) swap ]
  }

main = app.html

-- HOT-SWAPPING
port swap : Signal.Signal Bool

type alias Model = Int

-- INIT
init =
  (1, Effects.none)

-- VIEW
-- Examples of:
-- 1)  an externally defined component ('hello', takes 'model' as arg)
-- 2a) styling through CSS classes (external stylesheet)
-- 2b) styling using inline style attribute (two variants)
view address model =
  div
    [ class wrapperCls ]
    [  hello model
    ,  p [ class titleCls ] [ text ( "Elm Webpack Starter" ) ]
    ,  button [ onClick address Increment ] [ text "+1" ]
    ,  button [ onClick address Decrement ] [ text "-1" ]
    ,  img [ src "img/elm.jpg", class imageCls ] []
    ]

update action model =
  case action of
    NoOp -> (model, Effects.none)
    Increment -> (model + 1, Effects.none)
    Decrement -> (model - 1, Effects.none)
