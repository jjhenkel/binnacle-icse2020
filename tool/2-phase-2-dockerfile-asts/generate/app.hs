{-# LANGUAGE OverloadedStrings, DeriveGeneric, StandaloneDeriving, DeriveAnyClass #-}

import Data.List
import System.IO
import Data.Aeson
import GHC.Generics
import Control.Monad
import System.Environment
import Control.Applicative
import Control.Monad.Identity

import ShellCheck.AST
import ShellCheck.Data
import ShellCheck.Parser
import ShellCheck.Interface

import Text.Parsec
import Data.Text (Text, unpack)
import Data.Aeson.Text (encodeToLazyText)

import qualified Data.Map as Map
import qualified Data.ByteString.Lazy as B
import qualified Data.Text.Lazy.IO as LIO

deriving instance ToJSON Id
deriving instance Generic ConditionType
deriving instance ToJSON ConditionType

instance ToJSON SourcePos where
  toJSON x = String ""

deriving instance Generic AssignmentMode
deriving instance ToJSON AssignmentMode
deriving instance Generic CaseType
deriving instance ToJSON CaseType
deriving instance Generic FunctionKeyword
deriving instance ToJSON FunctionKeyword
deriving instance Generic FunctionParentheses
deriving instance ToJSON FunctionParentheses
deriving instance Generic Dashed
deriving instance ToJSON Dashed
deriving instance Generic Quoted
deriving instance ToJSON Quoted
deriving instance Generic Annotation
deriving instance ToJSON Annotation
deriving instance Generic Token
deriving instance ToJSON Token

getBash value =
  prRoot (runIdentity $ (parseScript (mockedSystemInterface []) $ newParseSpec {
    psFilename = "debug", psScript = value
  }))

-- Goal: read one line of input (which represents some embedded bash)
--  + Try to parse this line
--    + If it does return the serialized repsone!
--    + If not maybe return a 'UNKNOWN' ast node or something of that sort?

main = do
  line <- getLine
  case getBash line of
    Just x -> LIO.putStrLn (encodeToLazyText x)
    otherwise -> LIO.putStrLn "{ 'type': 'UNKNOWN' }"
