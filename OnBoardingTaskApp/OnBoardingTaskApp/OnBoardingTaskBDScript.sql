/****** Object:  Database [OnBoardingTaskDB]    Script Date: 2/09/2020 6:38:40 pm ******/
CREATE DATABASE [OnBoardingTaskDB]  (EDITION = 'Standard', SERVICE_OBJECTIVE = 'S0', MAXSIZE = 250 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS;
GO

ALTER DATABASE [OnBoardingTaskDB] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET ARITHABORT OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [OnBoardingTaskDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [OnBoardingTaskDB] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO

ALTER DATABASE [OnBoardingTaskDB] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [OnBoardingTaskDB] SET READ_COMMITTED_SNAPSHOT ON 
GO

ALTER DATABASE [OnBoardingTaskDB] SET  MULTI_USER 
GO

ALTER DATABASE [OnBoardingTaskDB] SET ENCRYPTION ON
GO

ALTER DATABASE [OnBoardingTaskDB] SET QUERY_STORE = ON
GO

ALTER DATABASE [OnBoardingTaskDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO

ALTER DATABASE [OnBoardingTaskDB] SET  READ_WRITE 
GO


